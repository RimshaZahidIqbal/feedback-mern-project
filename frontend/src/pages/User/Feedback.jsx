import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, SelectDropdown } from '../../components/inputs';
import { COURSES } from '../../utils/data';
import { toast } from 'react-toastify';
import { Navbar } from '../../components/layouts';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const courseOptions = COURSES.map(course => ({ label: course, value: course }));
const ratingOptions = [1, 2, 3, 4, 5].map(r => ({ label: `${r} Star`, value: r }));

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: '',
        rating: null,
        comments: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleDropdownChange = (field, value) => {
        const parsedValue = field === 'rating' ? Number(value) : value;
        setFormData(prev => ({ ...prev, [field]: parsedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, course, rating } = formData;
        if (!name || !email || !course || !rating) {
            toast.error("All fields except comments are required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.FEEDBACK.CREATE_FEEDBACK, formData);
            toast.success("Feedback submitted!");
            navigate("/thankyou");
        } catch (err) {
            toast.error(err.response?.data?.message || "Submission failed.");
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4">
            <Navbar />
            <div className="w-full max-w-xl mt-8 bg-white form-card">
                <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-5 text-center">
                    Submit Feedback
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <Input
                            name="name"
                            type="text"
                            label="Name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Course Dropdown */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Course</label>
                        <SelectDropdown
                            options={courseOptions}
                            value={formData.course}
                            onChange={(val) => handleDropdownChange('course', val)}
                        />
                    </div>

                    {/* Rating Dropdown */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Rating</label>
                        <SelectDropdown
                            options={ratingOptions}
                            value={formData.rating}
                            onChange={(val) => handleDropdownChange('rating', val)}
                        />
                    </div>

                    {/* Comments */}
                    <textarea
                        name="comments"
                        placeholder="Your comments (optional)"
                        value={formData.comments}
                        onChange={handleChange}
                        className="form-input resize-none"
                        rows={4}
                    />

                    {/* Submit Button */}
                    <button type="submit" className="btn-primary">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
