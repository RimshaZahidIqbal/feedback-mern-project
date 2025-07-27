const mongoose = require("mongoose");
const { COURSES } = require("../utils/constants");

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        // course: {
        //     type: String,
        //     required: [true, "Course name is required"],
        //     trim: true,
        // },
        course: { type: String, enum: COURSES, required: true },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating must be at most 5"],
        },
        comments: {
            type: String,
            trim: true,
            maxlength: [1000, "Comments can't exceed 1000 characters"],
        },
    },
    {
        timestamps: true, // createdAt and updatedAt
    }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
