const mongoose = require("mongoose");

const interviewQuestionSchema = new mongoose.Schema(
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

    questions: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("InterviewQuestion", interviewQuestionSchema);
