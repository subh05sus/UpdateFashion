import mongoose, { Schema, Document } from "mongoose";

export interface SizeOption {
  size: string;
  quantityAvailable: number;
}

export interface ProductType extends Document {
  imageUrl: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  category: "footwear" | "clothing";
  subCategory: string | string[];
  isSpecialPrice: boolean;
  isFeatured: boolean;
  highlights: string[];
  specs: { key: string; value: string }[];
  adminRating: number;
  prioritizeAdminRating: boolean;
  reviews: mongoose.Types.ObjectId[]; // Reference to the Review model
  sizeOptions: SizeOption[]; // Updated field for size options and their quantity
}

const productSchema: Schema<ProductType> = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["footwear", "clothing"], required: true },
  subCategory: { type: [String], required: true },
  isSpecialPrice: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  highlights: { type: [String], required: true },
  specs: [{ key: { type: String }, value: { type: String } }],
  adminRating: { type: Number },
  prioritizeAdminRating: { type: Boolean, default: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  sizeOptions: [
    {
      size: { type: String, required: true },
      quantityAvailable: { type: Number, required: true, default: 0 },
    },
  ], // Updated schema for size and availability
});

const Product = mongoose.model<ProductType>("Product", productSchema);

export default Product;
