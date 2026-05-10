import mongoose from "mongoose";

const homepageSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    viewAllLink: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    productLimit: { type: Number, default: 12, min: 1, max: 50 },
  },
  { timestamps: true }
);

const HomepageSection =
  mongoose.models.HomepageSection ||
  mongoose.model("HomepageSection", homepageSectionSchema);

export default HomepageSection;
