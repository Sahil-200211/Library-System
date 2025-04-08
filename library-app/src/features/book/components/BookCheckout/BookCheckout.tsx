import React, {useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

import './BookCheckout.css';
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { checkoutBook, setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice";
import { Button } from "@mui/material";

export const BookCheckout:React.FC = () => {
    const user = useSelector((state:RootState) => state.authentication.loggedInUser);
    const book = useSelector((state:RootState) => state.book.currentBook);

    const dispatch:AppDispatch = useDispatch();

    const libraryCardRef = useRef<HTMLInputElement>(null);

    const checkout = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(book && user && libraryCardRef && libraryCardRef.current) {
            dispatch(checkoutBook({
                book,
                employee:user,
                libraryCard: libraryCardRef.current.value
            }))
        }
        dispatch(setCurrentBook(undefined));
        dispatch(setDisplayLoan(false));
    }

    return (
        <div className="book-checkout">
            {
                book && user &&
                <form className="book-checkout-form">
                    <h3>Loan Book Titled: {book.title}</h3>
                    <h4>Enter Patron's Library Card: </h4>
                    <input className="book-checkout-input" placeholder="Library Card ID" ref={libraryCardRef} />
                    <h4>Checkout Employee ID: </h4>
                    <input className="book-checkout-input" value={user._id} disabled />
                    <Button 
                    variant="contained"
                    onClick={checkout}
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
                    Loan Book
                    </Button>
                </form>
            }
        </div>
    )
}