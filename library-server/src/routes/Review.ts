import express from 'express';
import Review from '../models/Review';

const router = express.Router();

// POST /api/reviews
router.post(
  '/',
  async (
    req: express.Request<{}, {}, { book: string; userName: string; rating: number; comment?: string }>,
    res: express.Response
  ): Promise<void> => {
    const { book, userName, rating, comment } = req.body;

    if (!book || !userName || !rating) {
      res.status(400).json({ error: 'Book, user, and rating are required' });
      return;
    }

    try {
      const existing = await Review.findOne({ book, userName });
      if (existing) {
        res.status(400).json({ error: 'You already reviewed this book, chief 🧠📚' });
        return;
      }

      const review = new Review({ book, userName, rating, comment });
      await review.save();

      res.status(201).json(review);
    } catch (err: any) {
      console.error('Review creation error:', err.message);
      res.status(500).json({ error: 'Failed to create review' });
    }
  }
);

// GET /api/reviews/book/:bookId
router.get(
  '/book/:bookId',
  async (req: express.Request<{ bookId: string }>, res: express.Response): Promise<void> => {
    try {
      const reviews = await Review.find({ book: req.params.bookId });
      res.json(reviews);
    } catch (err: any) {
      console.error('Fetching reviews error:', err.message);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }
);

export default router;
