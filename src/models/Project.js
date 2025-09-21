import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "AI/ML",
        "Blockchain",
        "Web Development",
        "Mobile Development",
        "IoT",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "Other",
      ],
    },
    domain: [
      {
        type: String,
        enum: [
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "NLP",
          "Blockchain",
          "Web3",
          "Frontend",
          "Backend",
          "Full Stack",
          "Mobile",
          "IoT",
          "Data Analytics",
          "Cybersecurity",
          "Cloud",
          "DevOps",
        ],
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Price cannot be negative"],
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "INR", "EUR", "GBP"],
      },
      discountedPrice: {
        type: Number,
        min: [0, "Discounted price cannot be negative"],
      },
      isOnSale: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    demoUrl: {
      type: String,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    downloadUrl: {
      type: String,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    estimatedTime: {
      type: String,
      required: [true, "Estimated completion time is required"],
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    deliverables: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
projectSchema.index({ category: 1, isActive: 1 });
projectSchema.index({ domain: 1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({ isFeatured: 1, isActive: 1 });
projectSchema.index({ "pricing.basePrice": 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({
  title: "text",
  description: "text",
  shortDescription: "text",
});

// Virtual for formatted price
projectSchema.virtual("formattedPrice").get(function () {
  const price = this.pricing.isOnSale
    ? this.pricing.discountedPrice
    : this.pricing.basePrice;
  return `${this.pricing.currency} ${price}`;
});

// Virtual for discount percentage
projectSchema.virtual("discountPercentage").get(function () {
  if (
    this.pricing.isOnSale &&
    this.pricing.discountedPrice < this.pricing.basePrice
  ) {
    return Math.round(
      ((this.pricing.basePrice - this.pricing.discountedPrice) /
        this.pricing.basePrice) *
        100
    );
  }
  return 0;
});

// Ensure virtual fields are serialized
projectSchema.set("toJSON", { virtuals: true });

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

