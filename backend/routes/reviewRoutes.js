const express = require("express");

const router = express.Router();

const {
  reviewCode,
  generateInterviewQuestions,
  getReviews,
  deleteReview,
  getInterviewQuestionsHistory,
} = require("../controllers/reviewController");

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/review", authMiddleware, upload.single("codeFile"), reviewCode);

router.get("/reviews", authMiddleware, getReviews);

router.delete("/reviews/:id", authMiddleware, deleteReview);

router.post(
  "/interview-questions",
  authMiddleware,
  upload.single("codeFile"),
  generateInterviewQuestions,
);

router.get(
  "/interview-questions",
  authMiddleware,
  getInterviewQuestionsHistory,
);

module.exports = router;
