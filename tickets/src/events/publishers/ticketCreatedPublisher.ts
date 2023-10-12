import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@maxdevback/ticketing-shared/build";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
