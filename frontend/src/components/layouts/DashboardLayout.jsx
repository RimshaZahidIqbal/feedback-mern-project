import React, { useContext } from 'react';
import { SideMenu, Navbar } from "./";
import { UserContext } from '../../context/userContext';

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className='grow mx-5 my-4'>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
