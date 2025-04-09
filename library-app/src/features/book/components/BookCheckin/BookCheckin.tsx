import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { checkinBook, setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice";

import { Box, Typography, TextField, Button, Stack } from "@mui/material";

export const BookCheckin: React.FC = () => {
  const book = useSelector((state: RootState) => state.book.currentBook);
  const user = useSelector((state: RootState) => state.authentication.loggedInUser);

  const dispatch: AppDispatch = useDispatch();

  const checkin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (book && user) {
      dispatch(checkinBook({
        book,
        employee: user,
      }));
      dispatch(setDisplayLoan(false));
      dispatch(setCurrentBook(undefined));
    }
  };

  if (!book || !user) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <Stack spacing={2}>

            <Typography variant="h5" fontWeight={600} textAlign="left">
              Check In Book:
            </Typography>
            <Typography variant="h3" fontWeight={600} textAlign="center">
                {book.title}
            </Typography>

            <TextField
              label="Employee ID"
              value={user._id}
              disabled
              fullWidth
              variant="outlined"
            />

            <Button
              variant="contained"
              onClick={checkin}
              sx={{
                borderRadius: 3,
                backgroundColor: 'var(--secondary)',
                border: '1px solid black',
                '&:hover': {
                  backgroundColor: 'var(--background-primary)',
                  border: '2px solid var(--secondary)',
                  color: 'var(--secondary)',
                },
                color: 'black',
                transition: 'all 0.3s ease',
                mt: 2,
              }}
            >
              Check In
            </Button>
          </Stack>
    </Box>
  );
};
