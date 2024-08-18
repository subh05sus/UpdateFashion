import mongoose, { Schema, Document } from "mongoose";

export interface BannerType extends Document {
  imageUrl: string;
  link: string;
}

const bannerSchema: Schema<BannerType> = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
});

const Banner = mongoose.model<BannerType>("Banner", bannerSchema);

export default Banner;
