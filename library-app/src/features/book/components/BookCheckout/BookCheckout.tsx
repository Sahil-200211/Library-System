import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { checkoutBook, setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export const BookCheckout: React.FC = () => {
  const user = useSelector((state: RootState) => state.authentication.loggedInUser);
  const book = useSelector((state: RootState) => state.book.currentBook);

  const dispatch: AppDispatch = useDispatch();
  const libraryCardRef = useRef<HTMLInputElement>(null);
  const [libraryCardID, setLibraryCardID] = React.useState<string>("");

  const checkout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (book && user && libraryCardRef.current) {
      dispatch(checkoutBook({
        book,
        employee: user,
        libraryCard: libraryCardRef.current.value,
      }));
    }
    dispatch(setCurrentBook(undefined));
    dispatch(setDisplayLoan(false));
  };

  if (!book || !user) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <Stack spacing={2}>

            <Typography variant="h5" fontWeight={600} textAlign="left">
              Loan Book: 
            </Typography>

            <Typography variant="h3" fontWeight={600} textAlign="left">{book.title}</Typography>

            <TextField
              label="Library Card ID"
              inputRef={libraryCardRef}
              placeholder="Enter Library Card ID"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => setLibraryCardID(e.target.value)}
            />

            <TextField
              label="Employee ID"
              value={user._id}
              disabled
              fullWidth
              variant="outlined"
            />

            <Button
              variant="contained"
              onClick={checkout}
              disabled={libraryCardID.trim() === ""}
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
              Loan Book
            </Button>
          </Stack>
    </Box>
  );
};
