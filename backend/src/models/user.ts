import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

export interface UserType extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    orders: mongoose.Types.ObjectId[]; // Add orders field

}

const userSchema: Schema<UserType> = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: [] }], // Add orders field

});

userSchema.pre<UserType>('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
