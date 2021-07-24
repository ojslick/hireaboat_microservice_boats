import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@hireaboat/common';
import express, { Request, Response } from 'express';

import { Boat } from '../models/boat';

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

    boat.deleteOne();

    res.send({ status: 'successful' });
  }
);

export { router as deleteBoatRouter };
