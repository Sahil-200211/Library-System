
import express from 'express';
import axios from 'axios';
import Chatlog from '../models/Chatlog';
import BookDao from '../daos/BookDao';
import { parsePrompt } from '../utils/parsePrompt';

const router = express.Router();

router.post(
  '/chat',
  async (req: express.Request<{}, {}, { message: string }>, res: express.Response): Promise<void> => {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    let reply = ''; 

    try {

      let dbResult: string | null = null;
      const intent = parsePrompt(message);
      const today = new Date();
  
      switch (intent) {
        case 'GET_OVERDUE_BOOKS': {
          const books = await BookDao.find({ dueDate: { $lt: today }, returned: false });
          dbResult = `Overdue books: ${books.map(b => b.title).join(', ') || 'None 🎉'}`;
          break;
        }
  
        case 'COUNT_OVERDUE_BOOKS': {
          const count = await BookDao.countDocuments({ dueDate: { $lt: today }, returned: false });
          dbResult = `There are currently ${count} overdue books.`;
          break;
        }
  
        case 'LIST_BOOKS_DUE_THIS_WEEK': {
          const oneWeekFromNow = new Date();
          oneWeekFromNow.setDate(today.getDate() + 7);
          const books = await BookDao.find({
            dueDate: { $gte: today, $lte: oneWeekFromNow },
            returned: false,
          });
          dbResult = `Books due this week: ${books.map(b => b.title).join(', ') || 'None 🎉'}`;
          break;
        }
      }
  
      const finalPrompt = dbResult
        ? `${message}\n\nRelevant data from the library:\n${dbResult}\n\nRespond accordingly.`
        : message;

      const response = await axios.post('http://localhost:1234/v1/chat/completions', {
        model: 'gemma-3-1b-it',
        messages: [
          { role: 'system', content: 'You are an intelligent, a sweet lady and a helpful library assistant of the library Scriptoria. And a funny one too.' },
          { role: 'user', content: message },
        ],
      });

      reply = response.data.choices?.[0]?.message?.content || 'No response';
      res.json({ reply });
    } catch (err: any) {
      console.error('Chat error:', err.message);
      res.status(500).json({ error: 'Chat failed' });
    }

    await Chatlog.create({
      userMessage: message,
      gemmaResponse: reply,
      timestamp: new Date(), 
    });
  }
);

export default router;
