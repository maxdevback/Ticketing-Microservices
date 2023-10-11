import { Publisher } from ".";
import { OrderCancelledEvent } from "../event/orderCancelled";
import { Subjects } from "../subjects";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
