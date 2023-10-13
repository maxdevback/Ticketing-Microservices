import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@maxdevback/ticketing-shared/build";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
