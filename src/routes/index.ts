import express, { Request, Response } from 'express';
import { NotFoundError } from '@hireaboat/common';

import { Boat } from '../models/boat';

const router = express.Router();

router.get('/api/boats', async (req: Request, res: Response) => {
  const boats = await Boat.find();

  if (!boats) {
    throw new NotFoundError();
  }

  res.status(200).send(boats);
});

export { router as showBoatsRouter };
