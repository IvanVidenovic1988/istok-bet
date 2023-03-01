import moment from 'moment';
import React, { useState } from 'react';
import DecimalniSubmenu from '../../components/DecimalniSubmenu';
import Tiket from '../../components/Tiket';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setTicket } from '../../redux/ticket';

const MobileNav = () => {

    const { ticketState } = useAppSelector((state) => state.ticket)
    const dispatch = useAppDispatch();

    const [isModalOpen, setModalOpen] = useState(false);

    const submenuToggle = () => {
        setModalOpen((currState) => !currState)
        // setTicket(false)
    }

    return (
        <>
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
                            {isModalOpen && <DecimalniSubmenu setModalOpen={setModalOpen} />}
                        </li>
                        <li
                            onClick={() => dispatch(setTicket())}
                            className='mr-30px'>
                            <img
                                src='/images/slot-machine.png'
                                className='mobile-dropdown-icon'
                            ></img>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='relative'>
                {ticketState && <Tiket />}
            </div>
        </>
    );
}

export default MobileNav;