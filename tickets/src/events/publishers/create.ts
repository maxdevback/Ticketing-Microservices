import { Publisher, Subjects } from "../abstract";
import { TicketCreatedEvent } from "../abstract/events";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
