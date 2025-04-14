import React, { useEffect, useState } from "react";
import './BookInformation.css';
import { Book } from "../../../../models/Book";
import { mapAuthorsToString } from "../../utils/BookUtils";
import axios from "axios";

interface BookInfoProps {
    book: Book;
    showReviews?:boolean;
}

interface Review {
    _id?: string;
    userName: string;
    rating: number;
    comment?: string;
}

export const BookInformation: React.FC<BookInfoProps> = ({ book, showReviews = true }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`/api/reviews/book/${book._id}`);
                setReviews(res.data);
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            }
        };

        fetchReviews();
    }, [book._id]);

    const handleSubmit = async () => {
        if (!book?._id) {
            alert("Oops! Book ID is missing.");
            return;
        }
    
        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }
    
        if (rating < 1 || rating > 5) {
            alert("Please give a rating between 1 and 5 stars!");
            return;
        }
    
        const payload = {
            book: book._id,
            userName: name.trim(),
            rating,
            comment: comment.trim(),
        };
    
        console.log("Submitting review:", payload);
    
        try {
            const res = await axios.post("/api/reviews", payload);
            setReviews(prev => [...prev, res.data]);
            setName("");
            setRating(0);
            setComment("");
        } catch (err: any) {
            alert(err.response?.data?.error || "Failed to submit review");
        }
    };

    return (
        <div className="book-info">
            <div className="book-info-container">
                <img className="book-info-cover" src={book.cover} />
                <div>
                    <h2>{book.title}</h2>
                    <h3>{mapAuthorsToString(book)}</h3>
                    <p>{book.description}</p>
                </div>
            </div>

            {showReviews && (
                <div className="review-section">
                    <h3>Leave a Review</h3>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                style={{ cursor: "pointer", color: star <= rating ? "#ffc107" : "#ccc", fontSize: "24px" }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        placeholder="Leave a comment (optional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Submit Review</button>
                </div>
            )}

            {showReviews && (
                <div className="reviews-list">
                    <h3>Reviews</h3>
                    {reviews.length === 0 ? (
                        <p>No reviews yet 😢</p>
                    ) : (
                        reviews.map((review, index) => (
                            <div key={review._id || index} className="review-item">
                                <strong>{review.userName}</strong> rated it {review.rating}★
                                {review.comment && <p>{review.comment}</p>}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
