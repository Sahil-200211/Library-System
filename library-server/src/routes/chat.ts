// routes/chat.ts
import express from 'express';
import axios from 'axios';
import Chatlog from '../models/Chatlog';

const router = express.Router();

router.post(
  '/chat',
  async (req: express.Request<{}, {}, { message: string }>, res: express.Response): Promise<void> => {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    let reply = ''; // Declare reply in a broader scope

    try {
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
      timestamp: new Date(), // optional, the schema can handle default
    });
  }
);

export default router;
