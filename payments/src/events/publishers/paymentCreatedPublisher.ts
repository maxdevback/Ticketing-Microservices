import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@maxdevback/ticketing-shared/build";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
