import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@maxdevback/ticketing-shared/build";
import { stripe } from "../stripe";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/paymentCreatedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId } = req.body;
    const token =
      "pk_test_51O0gx1KiefitcDe0GjNpsaxXbCZ0nKbaObzePEg8oK75WlrDY1kkQxzQKd396q8zdjUp0VZFEudL7bk1owMWDGdm00VGzumOQF";
    console.log("Wtf&");
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }
    console.log("herwe");
    try {
      const charge = await stripe.charges.create({
        currency: "usd",
        amount: order.price * 100,
        source: "tok_visa",
      });
      const payment = Payment.build({
        orderId,
        stripeId: charge.id,
      });
      await payment.save();
      new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId,
      });

      res.status(201).send({ id: payment.id });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);

export { router as createChargeRouter };
