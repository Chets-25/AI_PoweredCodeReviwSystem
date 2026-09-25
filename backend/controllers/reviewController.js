const fs = require("fs");
const Review = require("../models/Review");
const InterviewQuestion = require("../models/InterviewQuestion");

const {
  reviewCode: getAIReview,
  generateInterviewQuestions: getInterviewQuestions,
} = require("../services/aiService");

const reviewCode = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a code file.",
        status: "error",
      });
    }

    const filePath = req.file.path;
    const code = fs.readFileSync(filePath, "utf-8");
    const aiReview = await getAIReview(code);

    const savedReview = await Review.create({
      fileName: req.file.originalname,
      userId: req.user.id,
      language: req.body.language || "javascript",
      reviewResult: aiReview,
      message: "Code file uploaded and read successfully!",
      status: "success",
      uploadedCode: code,
    });

    res.json({
      message: "Code file uploaded and read successfully!",
      status: "success",
      code: code,
      aiReview: aiReview,
    });
  } catch (error) {
    console.error("Code review error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI request limit reached. Please try again later.",
        status: "error",
      });
    }

    res.status(500).json({
      message: "Failed to generate AI code review.",
      status: "error",
    });
  }
};

const generateInterviewQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a code file.",
        status: "error",
      });
    }

    const filePath = req.file.path;
    const code = fs.readFileSync(filePath, "utf-8");
    const questions = await getInterviewQuestions(code);

    await InterviewQuestion.create({
      fileName: req.file.originalname,
      userId: req.user.id,
      questions: questions.questions,
    });

    res.json({
      message: "Interview questions generated successfully!",
      status: "success",
      questions: questions,
    });
  } catch (error) {
    console.error("Interview question error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI request limit reached. Please try again later.",
        status: "error",
      });
    }

    res.status(500).json({
      message: "Failed to generate interview questions.",
      status: "error",
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      status: "success",
      reviews: reviews,
    });
  } catch (error) {
    console.error("Fetch reviews error:", error);

    res.status(500).json({
      message: "Failed to fetch review history.",
      status: "error",
    });
  }
};

const getInterviewQuestionsHistory = async (req, res) => {
  try {
    const questions = await InterviewQuestion.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      status: "success",
      questions: questions,
    });
  } catch (error) {
    console.error("Fetch interview questions error:", error);

    res.status(500).json({
      message: "Failed to fetch interview question history.",
      status: "error",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedReview) {
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }

    res.json({
      status: "success",
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  reviewCode,
  generateInterviewQuestions,
  getReviews,
  deleteReview,
  getInterviewQuestionsHistory,
};
