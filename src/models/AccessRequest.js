import mongoose from "mongoose";

const accessRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentProof: {
      type: String, // URL to payment proof image/document
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "paypal", "stripe", "crypto", "other"],
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentCurrency: {
      type: String,
      default: "USD",
    },
    transactionId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    adminNotes: {
      type: String,
      maxlength: 1000,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    rejectedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
accessRequestSchema.index({ user: 1, project: 1 });
accessRequestSchema.index({ status: 1 });
accessRequestSchema.index({ createdAt: -1 });
accessRequestSchema.index({ user: 1, project: 1, status: 1 }); // Compound index for active requests

// Virtual for checking if request is active
accessRequestSchema.virtual("isActive").get(function () {
  return this.status === "approved";
});

// Method to approve request
accessRequestSchema.methods.approve = function (adminId, notes) {
  // Prevent duplicate approvals
  if (this.status === "approved") {
    throw new Error("Request is already approved");
  }

  this.status = "approved";
  this.approvedBy = adminId;
  this.approvedAt = new Date();
  if (notes) this.adminNotes = notes;
  return this.save();
};

// Method to reject request
accessRequestSchema.methods.reject = function (reason) {
  // Prevent duplicate rejections
  if (this.status === "rejected") {
    throw new Error("Request is already rejected");
  }

  this.status = "rejected";
  this.rejectedAt = new Date();
  this.rejectionReason = reason;
  return this.save();
};

// Static method to check if user has active access
accessRequestSchema.statics.hasActiveAccess = function (userId, projectId) {
  return this.findOne({
    user: userId,
    project: projectId,
    status: "approved",
  });
};

// Static method to get user's request history for a project
accessRequestSchema.statics.getUserRequestHistory = function (
  userId,
  projectId
) {
  return this.find({
    user: userId,
    project: projectId,
  }).sort({ createdAt: -1 });
};

export default mongoose.models.AccessRequest ||
  mongoose.model("AccessRequest", accessRequestSchema);
