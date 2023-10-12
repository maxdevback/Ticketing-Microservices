import { Router } from "express";
import { natsWrapper } from "../../natsWrapper";
import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@maxdevback/ticketing-shared/build";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../../events/publishers/orderCancelledPublisher";

const router = Router();

router.delete("/api/orders/:orderId", requireAuth, async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate("ticket");

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
});

export default router;
