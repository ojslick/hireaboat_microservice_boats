import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/boats',
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
  ],
  async (req: Request, res: Response) => {
    res.send('create boat');
  }
);

export { router as createBoatRouter };
