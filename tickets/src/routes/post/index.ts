import { Router, Request, Response } from "express";
import { requireAuth } from "../../middlewares/reqAuth";
import { validateRequest } from "../../middlewares/reqValidate";
import { body } from "express-validator";
import { Ticket } from "../../models/ticket";

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
    res.status(201).send(ticket);
  }
);

export default router;
