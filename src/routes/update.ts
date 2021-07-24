import express, { Request, Response } from 'express';

const router = express.Router();

router.put('/api/boats/:id', (req: Request, res: Response) => {
  res.send('update boat');
});

export { router as updateBoatRouter };
