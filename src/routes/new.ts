import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Boat } from '../models/boat';
import { validateRequest, requireAuth } from '@hireaboat/common';

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
    body('price').trim().notEmpty().withMessage('You must input price'),
    body('cabins').notEmpty().withMessage('You must input cabins'),
    body('bathrooms').notEmpty().withMessage('You must input bathrooms'),
    body('lengthOfBoat')
      .notEmpty()
      .withMessage('You must input length of boat'),
    body('boatCapicity').notEmpty().withMessage('You must input boat capacity'),
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

    res.status(201).send(boat);
  }
);

export { router as createBoatRouter };
