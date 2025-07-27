const Feedback = require("../models/Feedback");
const { COURSES } = require('../utils/constants');
// Submit feedback
const submitFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json(feedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get feedback by ID
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });
        res.json({ message: "Feedback deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getFeedbackSummary = async (req, res) => {
    try {
        const summary = {};

        for (const course of COURSES) {
            const feedbacks = await Feedback.find({ course });

            const total = feedbacks.length;
            const avg = total === 0 ? 0 : (
                feedbacks.reduce((sum, item) => sum + (item.rating || 0), 0) / total
            ).toFixed(1);

            summary[course] = {
                total,
                avg: parseFloat(avg),
            };
        }

        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    submitFeedback,
    getAllFeedbacks,
    getFeedbackById,
    deleteFeedbackById,
    getFeedbackSummary
};
