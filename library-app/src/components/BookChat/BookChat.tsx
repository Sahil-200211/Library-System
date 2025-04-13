import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import ReactMarkdown from 'react-markdown';

const BookChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setChat(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setChat(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setChat(prev => [...prev, { sender: 'ai', text: '⚠️ AI is asleep, try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
  sx={{
    p: 4,
    mt: 6,
    borderRadius: 6,
    maxWidth: '805px',
    width: '100%',
    height: '80vh',
    mx: 'auto',
    boxShadow: 4,
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <Typography variant="h5" fontWeight={700} mb={3} display="flex" alignItems="center">
    <ChatIcon sx={{ mr: 1 }} /> Ask the Librarian
  </Typography>

  <Box
    sx={{
      flexGrow: 1,
      overflowY: 'auto',
      bgcolor: '#f0f4fa',
      p: 3,
      borderRadius: 3,
      mb: 3,
      border: '1px solid #d0d7e2',
    }}
  >
    {chat.map((msg, i) => (
      <Typography
        key={i}
        variant="body1"
        sx={{
          mb: 2,
          textAlign: msg.sender === 'user' ? 'right' : 'left',
          color: msg.sender === 'user' ? 'primary.main' : 'text.secondary',
          whiteSpace: 'pre-wrap',
        }}
      >
        {msg.sender === 'user' ? '🧍‍♂️' : '🤖'} <ReactMarkdown>{msg.text}</ReactMarkdown>
      </Typography>
    ))}
  </Box>

  <Box display="flex" alignItems="center" gap={2}>
    <TextField
      fullWidth
      multiline
      minRows={2}
      maxRows={4}
      variant="outlined"
      placeholder="Ask about a book, author, or genre..."
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
    />
    <IconButton
      color="primary"
      onClick={sendMessage}
      disabled={loading}
      sx={{ alignSelf: 'flex-end', mb: '4px' }}
    >
      {loading ? <CircularProgress size={24} /> : <SendIcon />}
    </IconButton>
  </Box>
</Card>

  );
};

export default BookChat;
