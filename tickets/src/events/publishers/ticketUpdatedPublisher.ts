import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@maxdevback/ticketing-shared/build";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
