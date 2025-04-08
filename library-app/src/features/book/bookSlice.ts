import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Example async thunk for querying books
export const queryBooks = createAsyncThunk(
    'book/query',
    async (queryParams, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/book/query', { params: queryParams });
            return response.data;
        } catch (error:any) {
            // Extract serializable error details
            return rejectWithValue({
                message: error.message,
                code: error.code,
                stack: error.stack,
            });
        }
    }
);

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        error: null,
    },
    reducers: {},
});

export default bookSlice.reducer;