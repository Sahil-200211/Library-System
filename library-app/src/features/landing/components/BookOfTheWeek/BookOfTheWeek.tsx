import React from "react";
import './BookOfTheWeek.css'
import { BookInformation } from "../../../book";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const BookOfTheWeek:React.FC = () => {

    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate(`/resource/0439784549`);
    }

    return (
        <div className="book-of-the-week">
            <h1>Book of the Week</h1>
            <Button 
                    variant="outlined"
                    onClick={handleBookClick}
                    sx={{
                        width: '15%',
                        height: '2.1rem',
                        borderRadius: '20px',
                        border: '1px solid var(--secondary)',
                        '&:hover': {
                        backgroundColor: 'var(--background-primary)',
                        border:'2px solid var(--secondary)',
                        color: 'var(--secondary)',
                        },
                        color: 'black',
                        transition: 'all 0.3s ease',
                        marginLeft: '83%',
                        top: '-50.5px',
                    }}
                    >
                    See More
            </Button>
            <BookInformation book={{
                _id: "9.75",
                barcode: "31071980",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1587697303i/1.jpg",
                title: "Harry Potter and the Half-Blood Prince",
                authors: ["J.K. Rowling"],
                description: "Harry Potter and the Half-Blood Prince follows Harry's sixth year at Hogwarts, where he uncovers dark secrets about Voldemort’s past, discovers a mysterious Potions book belonging to the Half-Blood Prince, and faces devastating loss as the wizarding world prepares for war.",
                subjects: ["Magic", "Adventure"],
                publicationDate: new Date(2014-9-1),
                publisher: "Bloomsbury Children's Book",
                pages: 560,
                genre: "Fantasy",
                records: [],
            }}/>
        </div>
    )
}