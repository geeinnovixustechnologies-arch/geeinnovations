import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      maxlength: [200, "Service name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
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
        "Academic Projects",
        "Research Publication",
        "Assignment Writing",
        "Consulting",
        "Training",
        "Support",
      ],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    pricing: {
      startingPrice: {
        type: Number,
        required: [true, "Starting price is required"],
        min: [0, "Price cannot be negative"],
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "INR", "EUR", "GBP"],
      },
      pricingModel: {
        type: String,
        enum: ["fixed", "hourly", "per_page", "per_project"],
        default: "fixed",
      },
      customPricing: {
        type: Boolean,
        default: false,
      },
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    deliveryTime: {
      type: String,
      required: [true, "Delivery time is required"],
    },
    process: [
      {
        step: Number,
        title: String,
        description: String,
        duration: String,
      },
    ],
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
    isPopular: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "briefcase",
    },
    color: {
      type: String,
      default: "blue",
    },
    orderCount: {
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
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isPopular: 1, isActive: 1 });
serviceSchema.index({ "pricing.startingPrice": 1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({
  name: "text",
  description: "text",
  shortDescription: "text",
});

// Virtual for formatted price
serviceSchema.virtual("formattedPrice").get(function () {
  return `${this.pricing.currency} ${this.pricing.startingPrice}`;
});

// Virtual for pricing display
serviceSchema.virtual("pricingDisplay").get(function () {
  if (this.pricing.customPricing) {
    return "Custom Pricing";
  }

  const price = this.formattedPrice;
  switch (this.pricing.pricingModel) {
    case "hourly":
      return `${price}/hour`;
    case "per_page":
      return `${price}/page`;
    case "per_project":
      return `${price}/project`;
    default:
      return `Starting from ${price}`;
  }
});

// Ensure virtual fields are serialized
serviceSchema.set("toJSON", { virtuals: true });

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;

