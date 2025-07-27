import React, { useEffect, useState } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from '../utils/apiPaths';
import moment from 'moment';

const AllFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await axiosInstance(API_PATHS.FEEDBACK.GET_ALL_FEEDBACKS);
                setFeedbacks(res.data);
            } catch (err) {
                console.error('Error fetching feedbacks:', err);
            }
        };

        fetchFeedbacks();
    }, []);

    return (

        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">All Feedbacks</h1>
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr className="text-left text-sm text-gray-700">
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4 hidden md:table-cell">Submitted On</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.length > 0 ? feedbacks.map((fb) => (
                        <tr key={fb._id} className="border-t">
                            <td className="py-3 px-4 text-sm text-gray-800">{fb.name}</td>
                            <td className="py-3 px-4 text-sm text-gray-800">{fb.email}</td>
                            <td className="py-3 px-4 text-sm text-gray-800">{fb.course}</td>
                            <td className="py-3 px-4 text-sm text-yellow-600 font-semibold">{fb.rating}</td>
                            <td className="py-3 px-4 text-sm text-gray-500 hidden md:table-cell">{moment(fb.createdAt).format('Do MMM YYYY')}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6" className="text-center text-gray-500 py-6">No feedbacks found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
};

export default AllFeedbacks;
