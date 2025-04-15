import React, { useEffect, useState } from "react";
import './FeaturedBooks.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookInformation } from "../../../book";
import { Book } from "../../../../models/Book";

const STATIC_BOOKS: Book[] = [
    {
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
    },
    {
        _id: "67e665265ca5b6bebb7edd58",
        barcode: "9781594631931",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
        title: "Kite Runner",
        authors: ["Khaled Hosseini"],
        description: "1970s Afghanistan: Twelve-year-old Amir is desperate to win the local kite-fighting tournament and his loyal friend Hassan promises to help him. But neither of the boys can foresee what would happen to Hassan that afternoon, an event that is to shatter their lives. After the Russians invade and the family is forced to flee to America, Amir realises that one day he must return to an Afghanistan under Taliban rule to find the one thing that his new world cannot grant him: redemption.",
        subjects: ["Suspense & Thriller", "Spiritual Fiction"],
        publicationDate: new Date(2003-5-29),
        publisher: "Center Point Publishing",
        pages: 371,
        genre: "Fiction",
        records: [],
    },
    {
        _id: "67e665265ca5b6bebb7edd67",
        barcode: "0679734503",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382846449i/7144.jpg",
        title: "Crime and Punishment",
        authors: ["Fyodor Dostoevsky"],
        description: "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, a Napoleon: acting for a higher purpose beyond conventional moral law. But as he embarks on a dangerous game of cat and mouse with a suspicious police investigator, Raskolnikov is pursued by the growing voice of his conscience and finds the noose of his own guilt tightening around his neck. Only Sonya, a downtrodden sex worker, can offer the chance of redemption.",
        subjects: ["Murder", "Fiction"],
        publicationDate: new Date(1866-1-1),
        publisher: "P F Collier & Son Company",
        pages: 671,
        genre: "Fiction",
        records: [],
    },
    {
        _id: "67e665265ca5b6bebb7edd6d",
        barcode: "0143039431",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1375670575i/18114322.jpg",
        title: "The Grapes of Wrath",
        authors: ["John Steinbeck"],
        description: "The Pulitzer Prize-winning epic of the Great Depression, a book that galvanized—and sometimes outraged—millions of readers.First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joads—driven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity. A portrait of the conflict between the powerful and the powerless, of one man’s fierce reaction to injustice, and of one woman’s stoical strength, the novel captures the horrors of the Great Depression and probes into the very nature of equality and justice in America. At once a naturalistic epic, captivity narrative, road novel, and transcendental gospel, Steinbeck’s powerful landmark novel is perhaps the most American of American Classics.",
        subjects: ["Murder", "Fiction"],
        publicationDate: new Date(1866-1-1),
        publisher: "P F Collier & Son Company",
        pages: 671,
        genre: "Fiction",
        records: [],
    },
    {
        _id: "67e665265ca5b6bebb7edd6d",
        barcode: "1557427666",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1646444605i/485894.jpg",
        title: "The Metamorphosis",
        authors: ["Franz Kafka", "Stanley Corngold"],
        description: "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. He was laying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his domelike brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes.With it's startling, bizarre, yet surprisingly funny first opening, Kafka begins his masterpiece, The Metamorphosis. It is the story of a young man who, transformed overnight into a giant beetle-like insect, becomes an object of disgrace to his family, an outsider in his own home, a quintessentially alienated man. A harrowing—though absurdly comic—meditation on human feelings of inadequacy, guilt, and isolation, The Metamorphosis has taken its place as one of the most widely read and influential works of twentieth-century fiction. As W.H. Auden wrote, Kafka is important to us because his predicament is the predicament of modern man.",
        subjects: ["Murder", "Fiction"],
        publicationDate: new Date(1866-1-1),
        publisher: "P F Collier & Son Company",
        pages: 671,
        genre: "Fiction",
        records: [],
    },
    {
        _id: "67e665265ca5b6bebb7edd6d",
        barcode: "0307949508",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1351778881i/5060378.jpg",
        title: "The Girl Who Played with Fire",
        authors: ["Steig Larsson", "Reg Keeland"],
        description: "The ExposeMillenium publisher Mikael Blomkvist has made his reputation exposing corrupt establishment figures. So when a young journalist approaches him with an investigation into sex trafficking, Blomkvist cannot resist waging war on the powerful figures who control this lucrative industry.The MurderWhen a young couple is found dead in their Stockholm apartment, it's a straightforward job for Inspector Bublanski and his team. The killer left the weapon at the scene - and the fingerprints on the gun point in only one direction.The Girl Who Played with FireEx-security analyst Lisbeth Salander is wanted for murder. Her history of unpredictable and vengeful behaviour makes her an official danger to society - but no-one can find her. The only way Salander can be reached is by computer. But she can break into almost any network she chooses...",
        subjects: ["Murder", "Fiction"],
        publicationDate: new Date(1866-1-1),
        publisher: "P F Collier & Son Company",
        pages: 671,
        genre: "Fiction",
        records: [],
    },
    {
        _id: "67e665265ca5b6bebb7edd6d",
        barcode: "0358380251",
        cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654216226i/61215384.jpg",
        title: "The Return of the King",
        authors: ["J.R.R. Tolkien", "Veronica Henry"],
        description: "Begin your journey into Middle-earth.The inspiration for the upcoming original series on Prime Video, The Lord of the Rings: The Rings of Power.The Return of the King is the third part of J.R.R. Tolkien’s epic adventure The Lord of the Rings.One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.The Dark Lord has risen, and as he unleashes hordes of Orcs to conquer all Middle-earth, Frodo and Sam struggle deep into his realm in Mordor.To defeat Sauron, the One Ring must be destroyed in the fires of Mount Doom. But the way is impossibly hard, and Frodo is weakening. The Ring corrupts all who bear it and Frodo’s time is running out.Will Sam and Frodo succeed, or will the Dark Lord rule Middle-earth once more?",
        subjects: ["Murder", "Fiction"],
        publicationDate: new Date(1866-1-1),
        publisher: "P F Collier & Son Company",
        pages: 671,
        genre: "Fiction",
        records: [],
    },
    
];

export const FeaturedBooks: React.FC = () => {
    const navigate = useNavigate();
    const [randomBook, setRandomBook] = useState<Book | null>(null);
    const [fadeClass, setFadeClass] = useState<string>("book-info-fade-in");

    const pickRandomBook = () => {
        let newBook: Book;
        do {
            const randomIndex = Math.floor(Math.random() * STATIC_BOOKS.length);
            newBook = STATIC_BOOKS[randomIndex];
        } while (newBook._id === randomBook?._id);

        setFadeClass("book-info-fade");
        setTimeout(() => {
            setRandomBook(newBook);
            setFadeClass("book-info-fade-in"); 
        }, 500);
    };

    useEffect(() => {
        pickRandomBook(); // Initial pick
        const interval = setInterval(pickRandomBook, 1 * 60 * 1000); 
        return () => clearInterval(interval);
    }, []);

    const handleBookClick = () => {
        if (randomBook) {
            navigate(`/resource/${randomBook.barcode}`);
        }
    };

    return (
        <div className="book-of-the-week">
            <h1>📚 Featured Books</h1>
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
                        border: '2px solid var(--secondary)',
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
            {randomBook && (
                <div className={fadeClass}>
                    <BookInformation book={randomBook} showReviews={false} />
                </div>
            )}
        </div>
    );
};
