import React, { useEffect, useState } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from '../utils/apiPaths';
import moment from 'moment';
import { MdFeedback } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';

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
        <div className="p-6 mt-5 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <MdFeedback className="text-3xl text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Student Feedbacks</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-separate border-spacing-y-2">
                    <thead className="bg-gray-50 rounded-md text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="py-3 px-4">Student Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Course</th>
                            <th className="py-3 px-4">Rating</th>
                            <th className="py-3 px-4 hidden md:table-cell">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.length > 0 ? (
                            feedbacks.map((fb, index) => (
                                <tr key={fb._id} className="bg-white hover:bg-blue-50 transition rounded-lg shadow-sm">
                                    <td className="py-3 px-4 text-gray-800 font-medium">{fb.name}</td>
                                    <td className="py-3 px-4 text-gray-600 truncate max-w-[180px]">{fb.email}</td>
                                    <td className="py-3 px-4 text-gray-700">{fb.course}</td>
                                    <td className="py-3 px-4">
                                        <span className="inline-block px-3 py-1 text-xs font-bold text-yellow-600 bg-yellow-100 rounded-full">
                                            {fb.rating}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <FaRegCalendarAlt className="text-gray-400" />
                                            {moment(fb.createdAt).format('Do MMM YYYY')}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-gray-500 text-base">
                                    <div className="flex flex-col items-center justify-center">
                                        <MdFeedback className="text-4xl text-gray-300 mb-2" />
                                        No feedbacks found.
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllFeedbacks;
