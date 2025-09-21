import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    inquiryType: {
      type: String,
      enum: [
        "general",
        "project",
        "service",
        "support",
        "partnership",
        "other",
      ],
      default: "general",
    },
    projectType: {
      type: String,
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
      required: false,
    },
    budget: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "INR", "EUR", "GBP"],
      },
    },
    timeline: {
      type: String,
      enum: [
        "asap",
        "1-2_weeks",
        "1_month",
        "2-3_months",
        "3-6_months",
        "6+_months",
        "flexible",
      ],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in_progress", "quoted", "closed", "spam"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    source: {
      type: String,
      enum: ["website", "referral", "social_media", "advertisement", "other"],
      default: "website",
    },
    referrer: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    responses: [
      {
        message: { type: String, required: true, trim: true },
        respondedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        respondedAt: { type: Date, default: Date.now },
        isInternal: { type: Boolean, default: false },
      },
    ],
    attachments: [
      {
        name: String,
        url: String,
        size: Number,
        type: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    notes: [
      {
        note: String,
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        addedAt: { type: Date, default: Date.now },
        isInternal: { type: Boolean, default: true },
      },
    ],
    followUpDate: {
      type: Date,
    },
    convertedToOrder: {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      convertedAt: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ email: 1 });
inquirySchema.index({ inquiryType: 1 });
inquirySchema.index({ assignedTo: 1 });
inquirySchema.index({ priority: 1, status: 1 });
inquirySchema.index({ followUpDate: 1 });

// Virtual for formatted budget range
inquirySchema.virtual("formattedBudget").get(function () {
  if (!this.budget || (!this.budget.min && !this.budget.max))
    return "Not specified";

  const currency = this.budget.currency || "USD";
  if (this.budget.min && this.budget.max) {
    return `${currency} ${this.budget.min} - ${currency} ${this.budget.max}`;
  } else if (this.budget.min) {
    return `${currency} ${this.budget.min}+`;
  } else if (this.budget.max) {
    return `Up to ${currency} ${this.budget.max}`;
  }
  return "Not specified";
});

// Virtual for days since inquiry
inquirySchema.virtual("daysSinceInquiry").get(function () {
  const now = new Date();
  const diffTime = now - this.createdAt;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for response count
inquirySchema.virtual("responseCount").get(function () {
  return this.responses ? this.responses.length : 0;
});

// Virtual for last response date
inquirySchema.virtual("lastResponseDate").get(function () {
  if (!this.responses || this.responses.length === 0) return null;
  const sortedResponses = this.responses.sort(
    (a, b) => b.respondedAt - a.respondedAt
  );
  return sortedResponses[0].respondedAt;
});

// Ensure virtual fields are serialized
inquirySchema.set("toJSON", { virtuals: true });

const Inquiry =
  mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

export default Inquiry;

