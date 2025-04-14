import express from 'express';
import axios from 'axios';
import { config } from '../config/index';

const router = express.Router();

interface SummarizeRequestBody {
  title: string;
}

router.post(
  '/summarize',
  async (req: express.Request<{}, {}, SummarizeRequestBody>, res: express.Response): Promise<void> => {
    const { title } = req.body;

    if (!title) {
      res.status(400).json({ error: 'Title is required!' });
      return;
    }

    try {
      const response = await axios.post(
        `${config.openaiBaseUrl}/chat/completions`,
        {
          model: 'gemma-3-1b-it', // Match exactly with LM Studio model name
          messages: [
            {
              role: 'system',
              content: 'You are an expert and a funny librarian. Summarize books for patrons in a friendly and concise way.',
            },
            {
              role: 'user',
              content: `Please summarize the book titled "${title}" and give reasons why to read it. Also, can you not say "here is the summary".`
            },
          ],
          temperature: 0.7,
          max_tokens: 600,
          stream: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.openaiApiKey}`,
          },
        }
      );

      const summary = response.data.choices?.[0]?.message?.content;
      res.json({ summary });
    } catch (error: any) {
      console.error('Gemma API error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to generate summary from Gemma.' });
    }
  }
);

export default router;
