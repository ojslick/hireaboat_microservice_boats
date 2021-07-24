import { NotFoundError } from '@hireaboat/common';
import express, { Request, Response } from 'express';

import { Boat } from '../models/boat';

const router = express.Router();

router.get('/api/boats/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const boat = await Boat.findById(id);

  if (!boat) {
    throw new NotFoundError();
  }

  res.status(200).send(boat);
});

export { router as showBoatRouter };
