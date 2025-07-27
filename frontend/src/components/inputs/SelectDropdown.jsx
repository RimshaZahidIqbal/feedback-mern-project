import React, { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    return (
        <div className="relative w-full">
            {/* Dropdown button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-sm text-gray-900 outline-none bg-white border border-slate-200 px-3 py-3 rounded-md flex justify-between items-center"
            >
                <span className={`truncate ${!selectedLabel ? 'text-gray-700' : ''}`}>
                    {selectedLabel || placeholder || "Select option"}
                </span>
                <LuChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown content */}
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-slate-200 rounded-md shadow-md z-10">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="py-2 px-3 text-sm cursor-pointer hover:bg-gray-100"
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectDropdown;
