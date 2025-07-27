import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { COURSES } from '../../utils/data';
import { DashboardLayout } from '../../components/layouts';
import { API_PATHS } from '../../utils/apiPaths';
import AllFeedbacks from '../../components/AllFeedbacks';

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosInstance(API_PATHS.FEEDBACK.GET_ALL_FEEDBACKS_SUMMARY);
                setData(res.data);
            } catch (error) {
                console.error("Failed to fetch feedback summary:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback Summary</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.map(course => (
                        <div
                            key={course}
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition duration-300"
                        >
                            <h2 className="text-lg font-semibold text-indigo-700 mb-2">{course}</h2>
                            <div className="text-sm text-gray-700">
                                <p><span className="font-medium">Total Feedback:</span> {data[course]?.total || 0}</p>
                                <p><span className="font-medium">Average Rating:</span> {data[course]?.avg?.toFixed(1) || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <AllFeedbacks />
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
