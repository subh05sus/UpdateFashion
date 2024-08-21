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
const order_1 = __importDefault(require("../models/order"));
const user_1 = __importDefault(require("../models/user"));
const product_1 = __importDefault(require("../models/product"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/create", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure size and productId from req.body
        const { productId, size } = req.body;
        // Find the product by ID
        const product = yield product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Find the size option and decrement the quantity available
        const sizeOptionIndex = product.sizeOptions.findIndex((option) => option.size === size);
        if (sizeOptionIndex === -1) {
            return res.status(400).json({ message: "Size not available" });
        }
        if (product.sizeOptions[sizeOptionIndex].quantityAvailable <= 0) {
            return res.status(400).json({ message: "Size out of stock" });
        }
        product.sizeOptions[sizeOptionIndex].quantityAvailable -= 1;
        // Save the updated product
        yield product.save();
        // Create the new order by spreading req.body and adding userId
        const newOrder = new order_1.default(Object.assign(Object.assign({}, req.body), { userId: req.userId }));
        console.log(Object.assign(Object.assign({}, req.body), { userId: req.userId }));
        yield newOrder.save();
        // Add the order to the user's orders array
        yield user_1.default.findByIdAndUpdate(req.userId, { $push: { orders: newOrder._id } }, { new: true });
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
}));
router.put("/update-status/:orderId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;
        const updatedOrder = yield order_1.default.findByIdAndUpdate(orderId, { orderStatus }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find().populate("productId userId").exec();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}));
router.get("/get-my-orders", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield user_1.default.findById(req.userId)
            .populate({
            path: "orders",
            populate: {
                path: "productId",
                model: "Product",
            }
        })
            .exec();
        res.status(200).json(orders === null || orders === void 0 ? void 0 : orders.orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}));
router.get("/:orderId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield order_1.default.findById(orderId).populate("productId userId").exec();
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
}));
exports.default = router;
