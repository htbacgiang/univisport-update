import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
    trim: true,
  },
  aspectRatio: {
    type: String,
    default: "landscape",
  },
  width: {
    type: Number,
    default: 16,
  },
  height: {
    type: Number,
    default: 9,
  },
});

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Đồng phục thể thao", "Đồng phục doanh nghiệp"],
      default: "Đồng phục thể thao",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
    },
    gallery: [gallerySchema],
    overview: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
feedbackSchema.index({ slug: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });
feedbackSchema.index({ createdAt: -1 });

// Error handling middleware
feedbackSchema.post("save", function (error, doc, next) {
  if (error.name === "ValidationError") {
    next(new Error(`Validation failed: ${error.message}`));
  } else {
    next(error);
  }
});

let Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;
