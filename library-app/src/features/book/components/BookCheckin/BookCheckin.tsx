import React from "react";

import { useSelector, useDispatch } from "react-redux";

import './BookCheckin.css';
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { checkinBook, setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice";
import { Button } from "@mui/material";

export const BookCheckin:React.FC = () => {

    const book = useSelector((state:RootState) => state.book.currentBook);
    const user = useSelector((state:RootState) => state.authentication.loggedInUser);

    const dispatch:AppDispatch = useDispatch();

    const checkin = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(book && user){
            dispatch(checkinBook({
                book,
                employee: user
            }))
            dispatch(setDisplayLoan(false));
            dispatch(setCurrentBook(undefined));
        }
    }

    return (
        <div className="book-checkin">
            {
                book && user && 
                <form className="book-checkin-form">
                    <h3>Check In Book Titled: {book.title}</h3>
                    <h4>Check In Employee ID: </h4>
                    <input className="book-checkin-input" value={user._id} disabled />
                    <Button 
                    variant="contained"
                    onClick={checkin}
                    sx={{
                        width: '100%',
                        height: '2.1rem',
                        borderRadius: '20px',
                        backgroundColor: 'var(--secondary)',
                        border: '1px solid black',
                        '&:hover': {
                        backgroundColor: 'var(--background-primary)',
                        border:'2px solid var(--secondary)',
                        color: 'var(--secondary)',
                        },
                        color: 'black',
                        transition: 'all 0.3s ease',
                        marginTop: '1rem',
                    }}
                    >
                    Check In
                    </Button>
                </form>
            }
        </div>
    )
}