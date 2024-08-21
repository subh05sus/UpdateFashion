"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
    reviews: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Review" }],
    sizeOptions: [
        {
            size: { type: String, required: true },
            quantityAvailable: { type: Number, required: true, default: 0 },
        },
    ], // Updated schema for size and availability
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
