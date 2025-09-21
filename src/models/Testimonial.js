import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Client ID is required"],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false,
    },
    accessRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccessRequest",
      required: false,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      maxlength: [100, "Client name cannot exceed 100 characters"],
    },
    clientEmail: {
      type: String,
      required: [true, "Client email is required"],
      lowercase: true,
      trim: true,
    },
    clientTitle: {
      type: String,
      trim: true,
      maxlength: [100, "Client title cannot exceed 100 characters"],
    },
    clientCompany: {
      type: String,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    clientAvatar: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    review: {
      type: String,
      required: [true, "Review is required"],
      trim: true,
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    projectTitle: {
      type: String,
      trim: true,
      maxlength: [200, "Project title cannot exceed 200 characters"],
    },
    projectCategory: {
      type: String,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    helpful: {
      count: { type: Number, default: 0 },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    response: {
      message: String,
      respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      respondedAt: Date,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    metadata: {
      ipAddress: String,
      userAgent: String,
      source: { type: String, default: "website" },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
testimonialSchema.index({ isApproved: 1, isPublic: 1 });
testimonialSchema.index({ isFeatured: 1, isApproved: 1 });
testimonialSchema.index({ rating: -1 });
testimonialSchema.index({ projectId: 1 });
testimonialSchema.index({ clientId: 1 });
testimonialSchema.index({ createdAt: -1 });

// Virtual for star rating display
testimonialSchema.virtual("starRating").get(function () {
  return "★".repeat(this.rating) + "☆".repeat(5 - this.rating);
});

// Virtual for formatted date
testimonialSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Virtual for client display name
testimonialSchema.virtual("displayName").get(function () {
  if (this.clientTitle && this.clientCompany) {
    return `${this.clientName}, ${this.clientTitle} at ${this.clientCompany}`;
  } else if (this.clientTitle) {
    return `${this.clientName}, ${this.clientTitle}`;
  } else if (this.clientCompany) {
    return `${this.clientName} from ${this.clientCompany}`;
  }
  return this.clientName;
});

// Ensure virtual fields are serialized
testimonialSchema.set("toJSON", { virtuals: true });

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
