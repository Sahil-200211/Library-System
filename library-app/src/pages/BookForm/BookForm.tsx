import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';

const CreateBookForm = () => {
  const [book, setBook] = useState({
    barcode: '',
    cover: '',
    title: '',
    authors: '',
    description: '',
    subjects: '',
    publicationDate: '',
    publisher: '',
    pages: '',
    genre: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const payload = {
      ...book,
      authors: book.authors.split(',').map(a => a.trim()),  // string to array
      subjects: book.subjects.split(',').map(s => s.trim()), 
    };

    try {
      const res = await axios.post('http://localhost:8000/book', payload);
      setMessage(res.data.message);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message); // Accessing the 'message' property safely
          } else {
            console.log('Unknown error occurred');
          }
    }
  };

  return (
    <Box maxWidth={500} mx="auto" p={4}>
      <Typography variant="h4" mb={2}>Add New Book</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Barcode" name="barcode" onChange={handleChange} required />
          <TextField label="Cover Image URL" name="cover" onChange={handleChange} required />
          <TextField label="Title" name="title" onChange={handleChange} required />
          <TextField label="Authors (comma separated)" name="authors" onChange={handleChange} required />
          <TextField label="Description" name="description" onChange={handleChange} required multiline rows={4}/>
          <TextField label="Subjects (comma separated)" name="subjects" onChange={handleChange} required />
          <TextField label="Publication Date" name="publicationDate" type="date" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
          <TextField label="Publisher" name="publisher" onChange={handleChange} required />
          <TextField label="Pages" name="pages" type="number" onChange={handleChange} required />
          <TextField label="Genre" name="genre" onChange={handleChange} required />

          <Button variant="contained" type="submit">Create Book</Button>
          {message && <Typography>{message}</Typography>}
        </Stack>
      </form>
    </Box>
  );
};

export default CreateBookForm;
