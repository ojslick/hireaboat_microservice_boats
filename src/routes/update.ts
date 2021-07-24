import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@hireaboat/common';
import express, { Request, Response } from 'express';
import { Boat } from '../models/boat';

const router = express.Router();

router.put(
  '/api/boats/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      boatType,
      boatManufacturer,
      boatModel,
      city,
      boatHarbour,
      captain,
      price,
      cabins,
      bathrooms,
      lengthOfBoat,
      boatCapicity,
      boatDescription,
      photos,
    } = req.body;

    const boat = await Boat.findById(id);

    if (!boat) {
      throw new NotFoundError();
    }

    if (boat.orderId) {
      throw new BadRequestError('Cannot edit a reserved boat');
    }

    if (boat.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    boat.set({
      boatType,
      boatManufacturer,
      boatModel,
      city,
      boatHarbour,
      captain,
      price,
      cabins,
      bathrooms,
      lengthOfBoat,
      boatCapicity,
      boatDescription,
      photos,
    });

    await boat.save();

    res.send({
      boatType,
      boatManufacturer,
      boatModel,
      city,
      boatHarbour,
      captain,
      price,
      cabins,
      bathrooms,
      lengthOfBoat,
      boatCapicity,
      boatDescription,
      photos,
    });
  }
);

export { router as updateBoatRouter };
