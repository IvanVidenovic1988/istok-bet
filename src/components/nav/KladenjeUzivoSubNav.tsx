import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config/consts';
import { SUBNAV_ROUTES_UZIVO } from '../../consts/subNavRoutes';
import SubNavSearch from '../SubNavSearch';

const SubNavUzivo = () => {

    return (
        <div className='flex'>
            <div className='w-[calc(100%-19.375rem)] md:block'>
                <div className='h-[46px] my-[10px] mr-[10px] bg-[#2c2e30] flex justify-between'>

                    <ul className='text-[#e6e6e6] flex items-center'>
                        {SUBNAV_ROUTES_UZIVO.map((route) => (
                            <NavLink
                                to={(`${ROUTES.kladjenjeUzivo}/${route.link}`)}
                                key={route.label}
                                className={({ isActive }) =>
                                    `${isActive ? 'sub-nav-active' : ''} sub-nav-li px-[40px] border-b-[2px] border-[#525558]`}
                            >
                                {route.label}
                            </NavLink>
                        ))}
                    </ul>

                    <div className='flex bg-[#2c2e30]'>
                        <SubNavSearch />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SubNavUzivo;