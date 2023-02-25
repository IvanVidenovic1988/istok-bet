import moment from 'moment';
import React, { useState } from 'react';
import DecimalniSubmenu from '../../components/DecimalniSubmenu';
import Tiket from '../../components/Tiket';

const MobileNav = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [tiket, setTiket] = useState(false)

    const submenuToggle = () => {
        setModalOpen((currState) => !currState)
    }

    const tiketToggle = () => {
        setTiket((currState) => !currState)
    }

    return (
        <>
            <div className='h-[40px] flex items-center justify-between bg-black md:hidden'>

                <div className='text-[#ebebeb] px-[10px] text-[13px] md:hidden block opacity-50'>
                    {moment().format('MMMM Do YYYY, h:mm:ss a')}
                </div>

                <div>
                    <ul className='relative flex justify-between w-[150px]'>
                        <li onClick={() => submenuToggle()}>
                            <img
                                src='/images/slot-machine.png'
                                className='mobile-dropdown-icon'
                            ></img>
                            {isModalOpen && <DecimalniSubmenu setModalOpen={setModalOpen} />}
                        </li>
                        <li onClick={() => tiketToggle()} className='mr-30px'>
                            <img
                                src='/images/slot-machine.png'
                                className='mobile-dropdown-icon'
                            ></img>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {tiket && <Tiket />}
            </div>
        </>
    );
}

export default MobileNav;