import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/userContext';
import { SIDE_MENU_DATA } from '../../utils/data';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            localStorage.clear();
            clearUser();
            navigate("/");
        } else {
            navigate(route);
        }
    };

    useEffect(() => {
        if (user) {
            setSideMenuData(SIDE_MENU_DATA);
        }
    }, [user]);

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 sticky top-[61px] z-20'>
            <div className='flex flex-col items-center justify-center mb-6 pt-5'>
                <img
                    src={user?.profileImageUrl || "/boy-img-1.jpg"}
                    alt="Profile"
                    className='w-20 h-20 bg-slate-400 rounded-full object-cover object-top'
                />
                <div className='text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1'>
                    Admin
                </div>
                <h5 className='text-gray-950 font-medium mt-3'>
                    {user?.name || ""}
                </h5>
                <p className='text-[12px] text-gray-500'>
                    {user?.email || ""}
                </p>
            </div>

            {sideMenuData.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-md px-6 py-3 mb-2 ${activeMenu === item.label
                        ? "text-primary bg-blue-50 border-r-4 border-primary"
                        : "text-gray-700"
                        }`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;
