import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  book: mongoose.Types.ObjectId;
  userName: string
  rating: number; // 1 to 5
  comment?: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  userName: {type: String, required: true},
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
