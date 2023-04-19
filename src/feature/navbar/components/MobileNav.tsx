import React, { useState } from 'react';
import moment from 'moment';
import DecimalSubmenu from './DecimalSubmenu ';


const MobileNav = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const submenuToggle = () => {
        setModalOpen((currState) => !currState)
    }

    return (
        <div className='h-[40px] flex items-center justify-between bg-black md:hidden'>

            <div className='text-[#ebebeb] px-[10px] text-[13px] md:hidden block opacity-50'>
                {moment().format('MMMM Do YYYY, h:mm:ss a')}
            </div>

            <div>
                <ul className='relative flex justify-end w-[105px] mr-[10px]'>
                    <li onClick={() => submenuToggle()}>
                        <img
                            src='/images/slot-machine.png'
                            className='mobile-dropdown-icon'
                        ></img>
                        {isModalOpen && <DecimalSubmenu setModalOpen={setModalOpen} />}
                    </li>
                    <li
                        className='mr-30px'>
                        <img
                            src='/images/slot-machine.png'
                            className='mobile-dropdown-icon'
                        ></img>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MobileNav;