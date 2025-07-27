import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Feedback!</h1>
        <p className="mb-6">We appreciate your response.</p>
        <Link to="/" className="text-blue-500 underline">Go Back</Link>
    </div>
);

export default ThankYou;
