// import { useState } from 'react';
// import { Loader2, BookOpenText } from 'lucide-react';

// interface BookSummaryCardProps {
//   title: string;
// }

// const BookSummaryCard: React.FC<BookSummaryCardProps> = ({ title }) => {
//   const [summary, setSummary] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSummarize = async () => {
//     setLoading(true);
//     setError(null);
//     setSummary('');

//     try {
//       const response = await fetch('http://localhost:8000/api/summarize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title }),
//       });

//       const data: { summary?: string; error?: string } = await response.json();

//       if (data.summary) {
//         setSummary(data.summary);
//       } else {
//         setError(data.error || 'Unknown error occurred.');
//       }
//     } catch (err) {
//       setError('Failed to fetch summary.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 transition-all p-6">
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
//       <button
//         onClick={handleSummarize}
//         className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
//         disabled={loading}
//       >
//         {loading ? (
//           <>
//             <Loader2 className="animate-spin w-4 h-4" />
//             Summarizing...
//           </>
//         ) : (
//           <>
//             <BookOpenText className="w-4 h-4" />
//             Summarize
//           </>
//         )}
//       </button>
//     </div>
  
//     {error && <p className="text-red-500 mt-2">❌ {error}</p>}
  
//     {summary && (
//       <div className="bg-gray-100 p-4 rounded-lg mt-4">
//         <h3 className="text-lg font-semibold mb-2">📘 AI Summary:</h3>
//         <p className="text-gray-700 leading-relaxed">{summary}</p>
//       </div>
//     )}
//   </div>
  
//   );
// };

// export default BookSummaryCard;


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
        maxWidth: 700,
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
          <Typography variant="h5" fontWeight={700} color="primary.dark">
            <BookIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSummarize}
            disabled={loading}
            sx={{ borderRadius: '10px' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Summarize'}
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
            <Typography variant="body1" color="text.secondary">
              {summary}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>

      <CardActions></CardActions>
    </Card>
  );
};

export default BookSummaryCard;
