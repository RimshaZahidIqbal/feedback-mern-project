import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';

const ManageFeedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/all-feedback').then(res => {
            setFeedbackList(res.data);
        });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">All Feedback Entries</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Course</th>
                            <th className="p-3 border">Rating</th>
                            <th className="p-3 border">Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackList.map((item, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.email}</td>
                                <td className="p-3">{item.course}</td>
                                <td className="p-3">{item.rating}</td>
                                <td className="p-3">{item.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageFeedback;
