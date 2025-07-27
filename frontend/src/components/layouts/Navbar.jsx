import React, { useState, useContext } from "react";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import { SideMenu } from "./";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const navigate = useNavigate();
    const { user, clearUser } = useContext(UserContext);

    const handleLogout = () => {
        clearUser();
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between w-full bg-white border-b border-gray-300 px-6 py-4 sticky top-0 z-30">
            <div className="flex items-center gap-5">
                <button
                    className="block lg:hidden text-black"
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                >
                    {openSideMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />
                    )}
                </button>
                <h2 className="text-lg font-semibold text-black">Student Feedback</h2>
            </div>

            {user ? (
                <button
                    onClick={handleLogout}
                    className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={() => navigate("/login")}
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Admin Login
                </button>
            )}

            {openSideMenu && (
                <div className="fixed top-[61px] left-0 z-40 bg-white w-64">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
