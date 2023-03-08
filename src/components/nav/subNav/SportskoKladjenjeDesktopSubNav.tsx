import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../config/consts';
import { SUBNAV_ROUTES } from '../../../consts/subNavRoutes';

const SportskoKladjenjeDesktopSubNav: FC = () => {
    return (
        <>
            <ul className='text-[#e6e6e6] items-center hidden lg:flex'>
                {SUBNAV_ROUTES.map((route) => (
                    <NavLink
                        to={(`${ROUTES.sportskoKladjenje}/${route.link}`)}
                        key={route.label}
                        className={({ isActive }) =>
                            `${isActive ? 'sub-nav-active' : ''} sub-nav-li border-b-[2px] h-[46px] capitalize border-[#525558]`}
                    >
                        {route.label}
                    </NavLink>
                ))}
            </ul>
        </>
    );
}

export default SportskoKladjenjeDesktopSubNav;