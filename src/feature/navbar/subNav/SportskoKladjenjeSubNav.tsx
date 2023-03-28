import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../config/consts';
import { SUBNAV_ROUTES } from '../../../consts/subNavRoutes';
import SubNavSearch from './SubNavSearch';
import SportskoKladjenjeDesktopSubNav from './SportskoKladjenjeDesktopSubNav';
import SportskoKladjenjeMobileSubNav from './SportskoKladjenjeMobileSubNav';
import { useAppDispatch } from '../../../redux/hooks';
import { setSubnavToInactive } from '../../../redux/subnavState';
import { hideSidebar } from '../../../redux/sidebar';


const SubNav: FC = () => {

    const dispatch = useAppDispatch();

    const handleSubnav = () => {
        dispatch(setSubnavToInactive())
        dispatch(hideSidebar())
    }

    return (
        <div className='md:overflow-auto'>
            <div className='md:w-[calc(100%-19.375rem)] md:block '>

                <div className='h-[46px] my-[10px] mr-[10px] bg-[#2c2e30] flex justify-between'>

                    <div className='flex'>
                        <div>
                            {SUBNAV_ROUTES.slice(0, 1).map((route) => (
                                <NavLink
                                    to={(`${ROUTES.sportskoKladjenje}/${route.link}`)}
                                    key={route.label}
                                    onClick={() => handleSubnav()}
                                    className={({ isActive }) =>
                                        `${isActive ? 'sub-nav-active' : ''} sub-nav-li h-[46px] border-b-[2px] text-[#e6e6e6] border-[#525558]`}
                                >
                                    {route.label}
                                </NavLink>
                            ))}
                        </div>

                        <SportskoKladjenjeDesktopSubNav />
                        <SportskoKladjenjeMobileSubNav />

                    </div>


                    <div className='flex bg-[#2c2e30]'>
                        <div className='w-[46px] h-[46px] bg-[#ffbb1a] flex-center rounded-sm'>
                            <img
                                src="/images/slot-machine.png"
                                className='w-[16px] h-[16px]'
                            ></img>
                        </div>
                        <div className='w-[46px] h-[46px] mr-6 flex-center rounded-sm hover:bg-[#3f4144] hover:cursor-pointer'>
                            <img
                                src="/images/slot-machine.png"
                                className='w-[16px] h-[16px]'
                            ></img>
                        </div>

                        <SubNavSearch />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SubNav;