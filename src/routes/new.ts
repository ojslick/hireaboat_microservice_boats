import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Boat } from '../models/boat';
import { validateRequest, requireAuth } from '@hireaboat/common';
import { BoatCreatedPublisher } from '../events/publishers/boat-created-publisher';

const router = express.Router();

router.post(
  '/api/boats',
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

    const boat = Boat.build({
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
      userId: req.currentUser!.id,
    });

    await boat.save();

    new BoatCreatedPublisher(client).publish({
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
      userId: boat.userId,
      photos: boat.photos,
    });

    res.status(201).send(boat);
  }
);

export { router as createBoatRouter };
