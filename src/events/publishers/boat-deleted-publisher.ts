import { Publisher, Subjects, BoatDeletedEvent } from '@hireaboat/common';

export class BoatDeletedPublisher extends Publisher<BoatDeletedEvent> {
  Subject: Subjects.BoatDeleted = Subjects.BoatDeleted;
}
