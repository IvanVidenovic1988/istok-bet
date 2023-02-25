import React from 'react';

const Tiket = () => {
    return (
        <div className='w-[310px] pt-[10px] pr-[10px] bg-[#1a1c1d]'>
            <div className='h-[46px] bg-[#2c2e30] border-b-[2px] border-[#ffbb1a] flex-center'>
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