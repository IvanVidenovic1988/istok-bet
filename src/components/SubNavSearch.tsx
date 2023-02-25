import React from 'react';

const SubNavSearch = () => {
    return (
        <div className='w-[296px] h-[46px] flex'>
            <input
                className='w-[250px] h-[46px] bg-[#4f5157] px-[10px] py-[11px] outline-transparent rounded-sm border-none'
                placeholder='Trazi'
            ></input>
            <div className='w-[46px] h-[46px] flex-center bg-[#4f5157]'>
                <img
                    src="/images/search.png"
                    className='w-[16px] h-[16px] hover:cursor-pointer'
                >
                </img>
            </div>
        </div>
    );
}

export default SubNavSearch;