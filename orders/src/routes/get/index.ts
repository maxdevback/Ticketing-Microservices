import { Router } from "express";
import { Order } from "../../models/order";
import { requireAuth } from "@maxdevback/ticketing-shared/build";

const router = Router();
router.get("/api/orders", requireAuth, async (req, res) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
});

export default router;
