import mongoose, { Schema, Document } from "mongoose";

export interface ReviewType extends Document {
  rating: number;
  title: string;
  description: string;
  product: mongoose.Types.ObjectId;
}

const reviewSchema: Schema<ReviewType> = new mongoose.Schema({
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

const Review = mongoose.model<ReviewType>("Review", reviewSchema);

export default Review;
