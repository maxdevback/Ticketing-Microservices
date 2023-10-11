import { Publisher, Subjects } from "../abstract";
import { TicketUpdatedEvent } from "../abstract/events";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
