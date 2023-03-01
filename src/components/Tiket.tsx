import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setTicket } from '../redux/ticket';

const Tiket = () => {

    const dispatch = useAppDispatch();

    return (
        <div className='absolute top-[66px] right-[calc((100%-310px)/2)] z-50 w-[310px] bg-[#1a1c1d]'>
            <div className='h-[46px] bg-[#2c2e30] border-b-[2px] border-[#ffbb1a] flex-center'>
                <button
                    onClick={() => dispatch(setTicket())}
                    className='absolute left-[15px] text-[#ffbb1a]'
                >X</button>
                <p className='text-[#ffbb1a] font-semibold'>Tiket</p>
            </div>
            <div className='h-[42px] mx-[10px] flex'>
                <div className='w-[50%] text-white flex-center'>
                    Kombinovani
                </div>
                <div className='text-white w-[50%] flex-center'>
                    Sistem
                </div>
            </div>
            <div className='h-[120px] px-[50px] bg-[#242628] flex-center text-center'>
                <p className='text-white'>Odaberi opkladu klikom na zeljenu kvotu</p>
            </div>
            <div className='h-[90px] mt-[10px] p-[10px] bg-[#242628]'>

            </div>
        </div>
    );
}

export default Tiket;