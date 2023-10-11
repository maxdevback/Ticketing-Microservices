import { Publisher } from ".";
import { OrderCreatedEvent } from "../event/orderCreated";
import { Subjects } from "../subjects";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
