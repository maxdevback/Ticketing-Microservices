import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@maxdevback/ticketing-shared/build";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
