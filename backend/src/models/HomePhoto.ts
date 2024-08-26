import mongoose, { Schema, Document } from "mongoose";

export interface HomePhotoType extends Document {
  imageUrl: string;
  text: string;
}

const homePhotoSchema: Schema<HomePhotoType> = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  text: { type: String, required: false },
});

const HomePhoto = mongoose.model<HomePhotoType>("HomePhoto", homePhotoSchema);

export default HomePhoto;
