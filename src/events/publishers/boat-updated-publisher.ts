import { Publisher, Subjects, BoatUpdatedEvent } from '@hireaboat/common';

export class BoatUpdatedPublisher extends Publisher<BoatUpdatedEvent> {
  Subject: Subjects.BoatUpdated = Subjects.BoatUpdated;
}
