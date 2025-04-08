import React from "react";
import './BookOfTheWeek.css'
import { BookInformation } from "../../../book";

export const BookOfTheWeek:React.FC = () => {
    return (
        <div className="book-of-the-week">
            <h1>Book of the Week</h1>
            <BookInformation book={{
                _id: "9.75",
                barcode: "31071980",
                cover: "https://m.media-amazon.com/images/I/81DN1723hUL._SL1500_.jpg",
                title: "Harry Potter and the Half-Blood Prince",
                authors: ["J.K. Rowling"],
                description: "When Dumbledore arrives at Privet Drive one summer night to collect Harry Potter, his wand hand is blackened and shrivelled, but he does not reveal why. Secrets and suspicion are spreading through the wizarding world, and Hogwarts itself is not safe. Harry is convinced that Malfoy bears the Dark Mark: there is a Death Eater amongst them.Harry will need powerful magic and true friends as he explores Voldemort's darkest secrets, and Dumbledore prepares him to face his destiny.",
                subjects: ["Magic", "Adventure"],
                publicationDate: new Date(2014-9-1),
                publisher: "Bloomsbury Children's Book",
                pages: 560,
                genre: "Fantasy",
                records: []
            }} />
        </div>
    )
}