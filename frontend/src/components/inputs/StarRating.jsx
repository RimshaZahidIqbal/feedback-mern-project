import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const StarRating = ({ value, onChange }) => {
    const handleClick = (rating) => {
        onChange(rating);
    };

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleClick(star)}
                    className="cursor-pointer text-yellow-400 text-2xl"
                >
                    {value >= star ? <AiFillStar /> : <AiOutlineStar />}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
