import React from "react";

import './BookHistory.css';
import { Book } from "../../../../models/Book";
import { BookHistoryItem } from "../BookHistoryItem/BookHistoryItem";
// import { RootState } from "../../../../redux/ReduxStore";
// import { useSelector } from "react-redux";

interface BookHistoryProps {
    book: Book
}

// const authState = useSelector((state: RootState) => state.authentication)

export const BookHistory:React.FC<BookHistoryProps> = ({book}) => {
    
    return (
        // authState.loggedInUser?.type === "EMPLOYEE" && 
        <div className="book-history">
            <h2>Loan History</h2>
            <div className="book-history-box">
                {
                    book.records.map((record) => {
                        return(
                            <BookHistoryItem key={record._id} record={record} />
                        )
                    })
                }
            </div>
        </div> 
    )
}