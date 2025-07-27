const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
    submitFeedback,
    getAllFeedbacks,
    getFeedbackById,
    deleteFeedbackById,
    getFeedbackSummary
} = require("../controllers/feedbackController");

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit feedback (student)
// @access  Public or Private depending on use case
router.post("/", submitFeedback);

// @route   GET /api/feedback
// @desc    Get all feedbacks (admin only)
// @access  Private
router.get("/", protect, getAllFeedbacks);

// @route   GET /api/feedback/summary
// @desc    Get all feedback summary (admin only)
// @access  Private
// router.get("/summary", protect, getFeedbackSummary);
router.get("/summary", getFeedbackSummary);
// @route   GET /api/feedback/:id
// @desc    Get feedback by ID
// @access  Private
// router.get("/:id", protect, getFeedbackById);
router.get("/:id", getFeedbackById);

// @route   DELETE /api/feedback/:id
// @desc    Delete feedback by ID
// @access  Private
router.delete("/:id", protect, deleteFeedbackById);

module.exports = router;
