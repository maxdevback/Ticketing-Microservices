import { Router, Request, Response } from "express";
import { Ticket } from "../../models/ticket";

const router = Router();
router.get("/api/tickets", async (req: Request, res: Response) => {
  res.send(await Ticket.find({}));
});

export default router;
