import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/boats', async (req: Request, res: Response) => {
  res.send('get boats');
});

export { router as showBoatsRouter };
