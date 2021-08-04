import { Publisher, Subjects, BoatCreatedEvent } from '@hireaboat/common';

export class BoatCreatedPublisher extends Publisher<BoatCreatedEvent> {
  Subject: Subjects.BoatCreated = Subjects.BoatCreated;
}
