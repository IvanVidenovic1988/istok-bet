import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config/consts';
import { SUBNAV_ROUTES } from '../../consts/subNavRoutes';
import SubNavSearch from '../SubNavSearch';
// import Tiket from './Tiket';


const SubNav: FC = () => {

    return (
        <>
            <div className='flex overflow-hidden'>
                <div className='w-[calc(100%-19.375rem)] md:block'>
                    <div className='h-[46px] my-[10px] mr-[10px] bg-[#2c2e30] flex justify-between'>

                        <ul className='text-[#e6e6e6] flex items-center'>
                            {SUBNAV_ROUTES.map((route) => (
                                <NavLink
                                    to={(`${ROUTES.sportskoKladjenje}/${route.link}`)}
                                    key={route.label}
                                    className={({ isActive }) =>
                                        `${isActive ? 'sub-nav-active' : ''} sub-nav-li border-b-[2px] border-[#525558]`}
                                >
                                    {route.label}
                                </NavLink>
                            ))}
                        </ul>

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
        </>
    );
}

export default SubNav;