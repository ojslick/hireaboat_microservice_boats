import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/boats/:id', (req: Request, res: Response) => {
  res.send('showBoat');
});

export { router as showBoatRouter };
