import { Router } from "express";
import { requireAuth } from "../../middlewares/reqAuth";
import { Order } from "../../model/order";

const router = Router();
router.get("/api/orders", requireAuth, async (req, res) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
});

export default router;