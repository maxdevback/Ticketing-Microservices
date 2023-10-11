import { Router } from "express";
import { requireAuth } from "../../middlewares/reqAuth";
import { NotFoundError } from "../../errors/notFound";
import { NotAuthorizedError } from "../../errors/notAuth";
import { Order } from "../../model/order";
import { OrderStatus } from "../../model/types";
import { natsWrapper } from "../../natsWrapper";
import { OrderCancelledPublisher } from "../../events/abstract/publisher/orderCancelledPublisher";

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

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(200).send(order);
});

export default router;
