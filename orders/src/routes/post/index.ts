import { Router, Request, Response } from "express";
import { requireAuth } from "../../middlewares/reqAuth";
import { validateRequest } from "../../middlewares/reqValidate";
import { body } from "express-validator";
import { Types } from "mongoose";
import { OrderCreatedPublisher } from "../../events/abstract/publisher/orderCreatedPublisher";
import { natsWrapper } from "../../natsWrapper";
import { Order } from "../../model/order";
import { OrderStatus } from "../../model/types";
import { Ticket } from "../../model/ticket";
import { NotFoundError } from "../../errors/notFound";
import { BadRequestError } from "../../errors/badRequest";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const router = Router();
router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send(order);
  }
);

export default router;
