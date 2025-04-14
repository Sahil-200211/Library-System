// components/FloatingChatbot.tsx
import {
    Box,
    IconButton,
    Paper,
    Typography,
    TextField,
    CircularProgress,
    Fade,
  } from '@mui/material';
  import ChatIcon from '@mui/icons-material/Chat';
  import CloseIcon from '@mui/icons-material/Close';
  import SendIcon from '@mui/icons-material/Send';
  import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
  
  export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    
    const toggleChat = () => setIsOpen(prev => !prev);
  
    const sendMessage = async () => {
      if (!input.trim()) return;
  
      const userMessage = { sender: 'user', text: input };
      setChat(prev => [...prev, userMessage]);
      setInput('');
      setLoading(true);
  
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });
        const data = await res.json();
  
        setChat(prev => [...prev, { sender: 'bot', text: data.reply }]);
      } catch (err) {
        setChat(prev => [...prev, { sender: 'bot', text: 'Oops, something went wrong!' }]);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
          }}
        >
          <IconButton
            color="inherit"
            size='large'
            sx={{ bgcolor: 'springgreen', boxShadow: 3}}
            onClick={toggleChat}
          >
            {isOpen ? <CloseIcon /> : <ChatIcon />}
          </IconButton>
        </Box>
  
        <Fade in={isOpen}>
          <Paper
            elevation={6}
            sx={{
              position: 'fixed',
              bottom: 90,
              right: 24,
              width: 400,
              height: 500,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              bgcolor: 'background.paper',
              zIndex: 9998,
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" mb={1}>
              🤖 Ask the Librarian
            </Typography>
  
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 1 }}>
              {chat.map((msg, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  component="div"
                  sx={{
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                    color: msg.sender === 'user' ? 'primary.main' : 'text.secondary',
                    mb: 1,
                  }}
                >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                </Typography>
              ))}
            </Box>
  
            <Box display="flex" gap={1}>
              <TextField
                size="small"
                fullWidth
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask something..."
              />
              <IconButton color="primary" onClick={sendMessage} disabled={loading}>
                {loading ? <CircularProgress size={20} /> : <SendIcon />}
              </IconButton>
            </Box>
          </Paper>
        </Fade>
      </>
    );
  }
  