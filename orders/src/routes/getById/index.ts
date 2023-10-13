import { Router } from "express";
import { Order } from "../../models/order";
import { natsWrapper } from "../../natsWrapper";
import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@maxdevback/ticketing-shared/build";
import { OrderCancelledPublisher } from "../../events/publishers/orderCancelledPublisher";

const router = Router();

router.get("/api/orders/:orderId", requireAuth, async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate("ticket");
  console.log(order);
  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(200).send(order);
});

export default router;
