import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { Types } from "mongoose";
import { natsWrapper } from "../../natsWrapper";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@maxdevback/ticketing-shared/build";
import { OrderCreatedPublisher } from "../../events/publishers/orderCreatedPublisher";

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
    console.log("Here");
    const ticket = await Ticket.findById(ticketId);
    const tickets = await Ticket.find({});
    console.log(tickets);
    console.log("This is req body", req.body.ticketId, ticket);
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
      version: order.version,
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
