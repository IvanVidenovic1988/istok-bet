import React, { FC, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../config/consts';
import { SUBNAV_ROUTES } from '../../../consts/subNavRoutes';

const SportskoKladjenjeMobileSubNav = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const submenuToggle = () => {
        setModalOpen((currState) => !currState)
    }

    return (
        <div
            onClick={() => submenuToggle()}
            className='relative w-[100px] px-[16px] flex items-center bg-[#2c2e30] border-b-[2px] border-[#525558] lg:hidden'
        >
            <div>
                <span className='text-white'>Vise</span>
            </div>

            <ul className={`text-[#e6e6e6] text-left absolute top-[46px] left-[0] flex flex-col items-center ${isModalOpen ? "opacity-1 transform duration-300" : "opacity-0 transform duration-200"}`}>
                {SUBNAV_ROUTES.map((route) => (
                    <NavLink
                        to={(`${ROUTES.sportskoKladjenje}/${route.link}`)}
                        key={route.label}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-[#525558]' : ''} bg-[#2c2e30] px-[16px] flex items-center w-[100px] h-[46px] border-b-[1px] border-[#525558]`}
                    >
                        {route.label}
                    </NavLink>
                ))}
            </ul>
        </div>
    );
}

export default SportskoKladjenjeMobileSubNav;