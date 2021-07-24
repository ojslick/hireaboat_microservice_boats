import express, { Request, Response } from 'express';

const router = express.Router();

router.delete('/api/boats/:id', (req: Request, res: Response) => {
  res.send('delete boat');
});

export { router as deleteBoatRouter };
