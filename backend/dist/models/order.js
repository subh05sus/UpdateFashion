"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    address: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: String, required: true },
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    orderStatus: { type: String, enum: ["ORDER PLACED", "ORDER CONFIRMED", "ORDER PROCESSING", "DISPATCHED", "IN TRANSIT", "OUT FOR DELIVERY", "DELIVERED", "CANCELED"], default: "ORDER PLACED" },
    amountToBePaid: { type: Number, required: true },
    alreadyPaid: { type: Boolean, default: false },
    size: { type: String, required: true }, // Add size field
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
