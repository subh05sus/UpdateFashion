"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = __importDefault(require("../models/review"));
const product_1 = __importDefault(require("../models/product"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Add a new review
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, rating, title, description } = req.body;
        const product = yield product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const review = new review_1.default({ rating, title, description, product: productId });
        yield review.save();
        product.reviews.push(review._id);
        yield product.save();
        res.status(201).json({ message: "Review added successfully", review });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add review", error });
    }
}));
// Edit a review
router.put("/edit/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review updated successfully", review });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update review", error });
    }
}));
// Delete a review
router.delete("/delete/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.default.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        yield product_1.default.findByIdAndUpdate(review.product, { $pull: { reviews: req.params.id } });
        res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete review", error });
    }
}));
// Get all reviews for a product
router.get("/product/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.default.find({ product: req.params.productId });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get reviews", error });
    }
}));
// Get a specific review
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.default.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get review", error });
    }
}));
exports.default = router;
