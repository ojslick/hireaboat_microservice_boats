import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@hireaboat/common';
import { body } from 'express-validator';
import express, { Request, Response } from 'express';
import { Boat } from '../models/boat';
import { BoatUpdatedPublisher } from '../events/publishers/boat-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/boats/:id',
  requireAuth,
  [
    body('boatType').notEmpty().withMessage('You must input boat type'),
    body('boatManufacturer')
      .trim()
      .notEmpty()
      .withMessage('You must input boat manufacturer'),
    body('boatModel')
      .trim()
      .notEmpty()
      .withMessage('You must input boat model'),
    body('city').trim().notEmpty().withMessage('You must input city'),
    body('boatHarbour')
      .trim()
      .notEmpty()
      .withMessage('You must input boat harbour'),
    body('captain').notEmpty().withMessage('You must input captain'),
    body('price')
      .isFloat({ gt: 0 })
      .notEmpty()
      .withMessage('Price must be greater than zero'),
    body('cabins')
      .isFloat({ gt: 0 })
      .notEmpty()
      .withMessage('Cabins must be greater than zero'),
    body('bathrooms')
      .isFloat({ gt: 0 })
      .notEmpty()
      .withMessage('Bathrooms must be greater than zero'),
    body('lengthOfBoat')
      .isFloat({ gt: 0 })
      .notEmpty()
      .withMessage('Length of boat be greater than zero'),
    body('boatCapicity')
      .isFloat({ gt: 0 })
      .notEmpty()
      .withMessage('Boat capacity must be greater than zero'),
    body('boatDescription')
      .trim()
      .notEmpty()
      .withMessage('You must input boat description'),
    body('photos').notEmpty().withMessage('You must upload a boat photo'),
  ],
  validateRequest,
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

    new BoatUpdatedPublisher(natsWrapper.client).publish({
      id: boat.id,
      boatType: boat.boatType,
      boatManufacturer: boat.boatManufacturer,
      boatModel: boat.boatModel,
      city: boat.city,
      boatHarbour: boat.boatHarbour,
      captain: boat.captain,
      price: boat.price,
      cabins: boat.cabins,
      bathrooms: boat.bathrooms,
      lengthOfBoat: boat.lengthOfBoat,
      boatCapicity: boat.boatCapicity,
      boatDescription: boat.boatDescription,
      photos: boat.photos,
      userId: boat.userId,
    });

    res.send(boat);
  }
);

export { router as updateBoatRouter };
