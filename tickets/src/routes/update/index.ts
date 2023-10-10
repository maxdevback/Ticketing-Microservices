import { Router, Request, Response } from "express";
import { requireAuth } from "../../middlewares/reqAuth";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/reqValidate";
import { Ticket } from "../../models/ticket";
import { NotFoundError } from "../../errors/notFound";
import { NotAuthorizedError } from "../../errors/notAuth";

const router = Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.currentUser?.id) throw new NotAuthorizedError();
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
  }
);

export default router;
