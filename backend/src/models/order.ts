import mongoose, { Schema, Document } from "mongoose";

export interface OrderType extends Document {
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pinCode: string;
  };
  email: string;
  phone: string;
  orderStatus: string;
  amountToBePaid: number;
  alreadyPaid: boolean;
  size: string; // Add size field
}

const orderSchema: Schema<OrderType> = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;
