import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../natsWrapper";
import {
  requireAuth,
  validateRequest,
} from "@maxdevback/ticketing-shared/build";
import { TicketCreatedPublisher } from "../../events/publishers/ticketCreatedPublisher";

const router = Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater that 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { price, title } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    console.log(ticket);
    try {
      await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version,
      });
    } catch (err) {
      console.log(err);
    }
    res.status(201).send(ticket);
  }
);

export default router;
