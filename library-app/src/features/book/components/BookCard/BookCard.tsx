import { useNavigate } from "react-router-dom";

import './BookCard.css';
import { Book } from "../../../../models/Book";
import { mapAuthorsToString } from "../../utils/BookUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { useEffect, useState } from "react";
import { setCurrentBook } from "../../../../redux/slices/BookSlice";
import { setDisplayLoan } from "../../../../redux/slices/ModalSlice";
import { Button } from "@mui/material";

interface BookCardProps {
    book : Book
}

export const BookCard:React.FC<BookCardProps> = ({book}) => {

    const user = useSelector((state:RootState) => state.authentication.loggedInUser);

    const dispatch:AppDispatch = useDispatch();

    const [available] = useState<boolean>(() => {
        if(book.records.length === 0) return true;

        return book.records[0].status === 'AVAILABLE';
    })


    const handleLoan = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(user?.type === 'EMPLOYEE'){
            dispatch(setCurrentBook(book));
            dispatch(setDisplayLoan(true));
        }
    }

    const navigate = useNavigate();

    const displayBook = () => {
        navigate(`/resource/${book.barcode}`);
    }

    useEffect(() => {
        let c = "book-card-loan-button";

        if(available){
            c += " available"
        } else {
            c += " unavailable"
        }

        if(user && user.type === 'EMPLOYEE' && available) {
            c += " checkout";
        } else if(user && user.type === 'EMPLOYEE' && !available) {
            c += " checkin";
        }

    }, [available, user?.type, book.records]);

    return (
        <div id="book-card" className="book-card" onClick={displayBook}>
            <img className="book-card-cover" src={book.cover} />
            <div className="book-card-info">
                <h1 className="book-card-title">{book.title}</h1>
                <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
                <p className="book-card-description">{book.description}</p>
            </div>
            <Button 
                    variant="contained"
                    onClick={handleLoan}
                    sx={{
                        width: '90%',
                        height: '2.5rem',
                        borderRadius: '12px',
                        backgroundColor: available ? 'var(--secondary)' : '#c50609',
                        '&:hover': {
                        backgroundColor: 'var(--background-primary)',
                        border: available ? '2px solid var(--secondary)' : '2px solid #CB4C4E',
                        color: available ? 'var(--secondary)' : '#CB4C4E',
                        },
                        color: 'white',
                        transition: 'all 0.3s ease',
                    }}
                    >
                    Status: {available ? "AVAILABLE" : "UNAVAILABLE"}
            </Button>
        </div>
    )
}