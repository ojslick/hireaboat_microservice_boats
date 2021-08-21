import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@hireaboat/common';
import express, { Request, Response } from 'express';
import { BoatDeletedPublisher } from '../events/publishers/boat-deleted-publisher';

import { Boat } from '../models/boat';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/boats/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const boat = await Boat.findById(id);

    if (!boat) {
      throw new NotFoundError();
    }

    if (boat.orderId) {
      throw new BadRequestError(
        'Cannot delete a boat that is already reserved'
      );
    }

    if (boat.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    await boat.deleteOne();
    new BoatDeletedPublisher(natsWrapper.client).publish({
      id: boat.id,
    });

    res.send({ status: 'successful' });
  }
);

export { router as deleteBoatRouter };
