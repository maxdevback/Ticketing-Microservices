import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@maxdevback/ticketing-shared/build";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
