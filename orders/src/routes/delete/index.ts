import { Router } from "express";
import { requireAuth } from "../../middlewares/reqAuth";
import { Order } from "../../model/order";
import { NotFoundError } from "../../errors/notFound";
import { NotAuthorizedError } from "../../errors/notAuth";
import { OrderStatus } from "../../model/types";
import { OrderCancelledPublisher } from "../../events/abstract/publisher/orderCancelledPublisher";
import { natsWrapper } from "../../natsWrapper";

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
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
});

export default router;
