const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    reviewResult: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    message: {
      type: String,
      default: "Review generated successfully",
    },

    status: {
      type: String,
      default: "success",
    },

    uploadedCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Review", reviewSchema);
