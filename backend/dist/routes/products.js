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
const product_1 = __importDefault(require("../models/product"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Add a new product
router.post("/add", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_1.default(req.body);
        yield product.save();
        res.status(201).json({ message: "Product added successfully", product });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add product", error });
    }
}));
// Edit a product
router.put("/edit/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update product", error });
    }
}));
// Delete a product
router.delete("/delete/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete product", error });
    }
}));
// Get all products
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find().populate("reviews");
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get products", error });
    }
}));
// Get products by category
router.get("/category/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find({
            category: req.params.category,
        }).populate("reviews");
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get products", error });
    }
}));
// Get products by sub-category
router.get("/subcategory/:subcategory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find({
            subCategory: req.params.subcategory,
        }).populate("reviews");
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get products", error });
    }
}));
router.get("/featured", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const featuredProducts = yield product_1.default.find({ isFeatured: true });
        res.json(featuredProducts);
    }
    catch (error) {
        console.error("Error fetching featured products:", error);
        res
            .status(500)
            .json({ message: "Error fetching featured products", error });
    }
}));
// Route to get 5 footwear products
router.get("/sneakers-home", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const footwearProducts = yield product_1.default.find({
            subCategory: "sneakers",
        }).limit(4);
        res.json(footwearProducts);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching footwear products", error });
    }
}));
router.get("/jerseys-home", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jerseys = yield product_1.default.find({ subCategory: "jersey" }).limit(4);
        res.json(jerseys);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching jerseys", error });
    }
}));
// Route to get 3 products from Men Clothing category
router.get("/men", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menProducts = yield product_1.default.find({ subCategory: "men" }).limit(3);
        res.json(menProducts);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching men clothing products", error });
    }
}));
// Route to get 3 products from Women Clothing subCategory
router.get("/women", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const womenProducts = yield product_1.default.find({ subCategory: "women" }).limit(3);
        res.json(womenProducts);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching women clothing products", error });
    }
}));
// Route to get 3 products from Casual Footwear subCategory
router.get("/casual", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const casualProducts = yield product_1.default.find({ subCategory: "casual" }).limit(3);
        res.json(casualProducts);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching casual footwear products", error });
    }
}));
// Route to get 3 products from Formal Clothing subCategory
router.get("/formal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formalProducts = yield product_1.default.find({ subCategory: "formal" }).limit(3);
        res.json(formalProducts);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching formal clothing products", error });
    }
}));
// Route to get 3 random products
router.get("/random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomProducts = yield product_1.default.aggregate([{ $sample: { size: 3 } }]);
        res.json(randomProducts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching random products", error });
    }
}));
// Get a specific product
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id).populate("reviews");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get product", error });
    }
}));
exports.default = router;
