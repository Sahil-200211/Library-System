import React from "react";

import { useNavigate } from "react-router-dom";

import'./BookHistoryItem.css';
import { LoanRecord } from "../../../../models/LoanRecord";

interface BookHistoryItemProps {
    record: LoanRecord;
}

export const BookHistoryItem:React.FC<BookHistoryItemProps> = ({record}) => {
    const navigate = useNavigate();

    const visitProfile = () => {
        navigate(`/profile/${record.patron}`);
    }

    return (
        <div className="book-history-item">
            <h4>Status: <span className={record.status === 'AVAILABLE' ? 'green' : 'red'}>{record.status}</span></h4>
            <div className="book-history-item-group">
                <p style={{
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
                onClick={visitProfile}>
                    Patron: {record.patron}
                </p>
                <p>Loan Date: {new Date(record.loanedDate).toDateString()}</p>
                {record.status === 'AVAILABLE' && record.returnDate && <p>Return Date: {new Date(record.returnDate).toDateString()}</p>}
            </div>
            <div className="book-history-item-group">
                <p>Loaner: {record.employeeOut}</p>
                <p>Return By Date: {new Date(record.dueDate).toDateString()}</p>
                {record.status === 'AVAILABLE' && record.employeeIn && <p>Returner: {record.employeeIn}</p>}
            </div>
        </div>
    )
}