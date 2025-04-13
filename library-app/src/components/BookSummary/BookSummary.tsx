import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Collapse,
  Box
} from '@mui/material';
import BookIcon from '@mui/icons-material/MenuBook';
import ReactMarkdown from 'react-markdown';

interface BookSummaryCardProps {
  title: string;
}

const BookSummaryCard: React.FC<BookSummaryCardProps> = ({ title }) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    setSummary('');

    try {
      const response = await fetch('http://localhost:8000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      const data: { summary?: string; error?: string } = await response.json();

      if (data.summary) {
        setSummary(data.summary);
        setExpanded(true);
      } else {
        setError(data.error || 'Unknown error occurred.');
      }
    } catch (err) {
      setError('Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 1000,
        margin: '1rem auto',
        borderRadius: '20px',
        boxShadow: 5,
        bgcolor: '#f5f9ff',
        transition: 'all 0.3s ease-in-out',
        ':hover': { boxShadow: 8 },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight={700} color="#2d90a4">
            <BookIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            {title}
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleSummarize}
            disabled={loading}
            sx={{ borderRadius: '10px' }}
          >
            {loading ? <CircularProgress size={24} color="warning" /> : 'Summarize'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" mt={2}>
            ❌ {error}
          </Typography>
        )}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box mt={3} p={2} bgcolor="white" borderRadius="10px" border="1px solid #ccc">
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              📘 AI Summary:
            </Typography>
            <Typography variant="body1" color="text.primary">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </Typography>
          </Box>
        </Collapse>
      </CardContent>

      <CardActions></CardActions>
    </Card>
  );
};

export default BookSummaryCard;
