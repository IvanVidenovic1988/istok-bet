import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DecimalniSubmenu from '../../../components/DecimalniSubmenu';
import { NAV_ROUTES, NAV_ROUTES_WITH_BG } from '../../../consts/NavRoutes';
import { useAppDispatch } from '../../../redux/hooks';
import { NavigationState, setNavigation } from '../../../redux/navigation';

const DesktopNav = () => {

    const dispatch = useAppDispatch();

    const [isModalOpen, setModalOpen] = useState(false);

    const submenuToggle = () => {
        setModalOpen((currState) => !currState)
    }

    const setNavigationAction = (name: NavigationState) => () => {
        dispatch(setNavigation(name))
    }

    return (
        <div className='hidden bg-black md:block'>

            <div className='max-w-[1890px] mx-auto px-[10px] flex justify-between overflow-hidden'>

                <ul className='h-[40px] flex text-white items-center'>

                    {NAV_ROUTES.map((route) => (
                        <NavLink
                            to={route.link}
                            key={route.label}
                            onClick={setNavigationAction(route.link as NavigationState)}
                            className={({ isActive }) =>
                                `${isActive ? 'desktop-nav-active' : ''} relative group h-[40px] flex-center nav-li-hover px-[7.5px]`}
                        >
                            {route.label}
                            <div className='underscore'></div>
                        </NavLink>
                    ))}

                    {NAV_ROUTES_WITH_BG.map((route) => (
                        <NavLink
                            to={route.link}
                            key={route.label}
                            className={({ isActive }) =>
                                `${isActive ? 'desktop-nav-active' : ''} relative group h-[40px] flex-center nav-li-hover px-[7.5px]`}
                        >
                            <div className='li-with-background'>
                                {route.label}
                                <div className='underscore'></div>
                            </div>
                        </NavLink>
                    ))}

                </ul>

                <ul className='flex items-center text-white'>
                    <li
                        onClick={() => submenuToggle()}
                        className='relative px-3 text-[12px] cursor-pointer'
                    >
                        <p>Decimalni</p>

                        {isModalOpen && <DecimalniSubmenu setModalOpen={setModalOpen} />}
                    </li>

                    <li className='pl-3 text-[12px]'>
                        <p>Podrska</p>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default DesktopNav;