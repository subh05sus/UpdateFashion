import mongoose, { Schema, Document } from 'mongoose';

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface OrderType extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  address: Address;
  email: string;
  phone: string;
  orderStatus: 'ORDER PLACED' | 'ORDER CONFIRMED' | 'ORDER PROCESSING' | 'DISPATCHED' | 'IN TRANSIT' | 'OUT FOR DELIVERY' | 'DELIVERED' | 'CANCELED';
  amountToBePaid: number;
  alreadyPaid: boolean;
}

const addressSchema: Schema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
});

const orderSchema: Schema<OrderType> = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: addressSchema, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  orderStatus: {
    type: String,
    enum: ['ORDER PLACED', 'ORDER CONFIRMED', 'ORDER PROCESSING', 'DISPATCHED', 'IN TRANSIT', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELED'],
    default: 'ORDER PLACED',
  },
  amountToBePaid: { type: Number, required: true },
  alreadyPaid: { type: Boolean, default: false },
});

const Order = mongoose.model<OrderType>('Order', orderSchema);

export default Order;
