import React from 'react'
import { SportMarket } from '../../../sidebar/types';

const ColumnDropdown = ({
    markets,
    name,
    selectedColumnId,
    selectHeaderColumns,
    selectedColumDropdown,
    isOpen
}
    :
    {
        markets: SportMarket[];
        name: string;
        selectedColumnId: number | null,
        selectHeaderColumns: (name: string, id: number) => (e: any) => void,
        selectedColumDropdown: () => void;
        isOpen: boolean;
    }) => {

    const selectedMarket = markets.find(market => market.id === selectedColumnId)
    console.log('selectedMarket: ', selectedMarket);

    return (
        <div className='relative w-full'>
            <div className='flex-center text-center relative hover:bg-[#272a2b]'>
                {selectedMarket &&
                    <div
                        key={selectedMarket.id}
                        onClick={selectedColumDropdown}
                        className='w-[70%] h-[40px] flex-center hover:bg-[#272a2b] leading-4 cursor-pointer'>
                        <span className='text-[14px]'>{selectedMarket.name}</span>
                    </div>
                }
                <img
                    src="/images/arrow-down-white.png"
                    className='w-[8px] h-[8px] absolute top-[16px] left-[190px]'
                ></img>
            </div>

            {markets.map((market) => (
                <div
                    key={market.id}
                    onClick={selectedColumDropdown}
                    className={`w-full py-6 absolute top-[40px] left-0
                        bg-[#1a1c1d] cursor-pointer z-50 ${isOpen
                            ? ''
                            : 'hidden'
                        } `}
                >
                    <h2 className='px-6 text-[18px] text-left'>Dodatne igre</h2>
                    <div className='mt-6'>
                        {markets.map((market) => (
                            <div key={market.id}>
                                <div
                                    className='h-[40px] pl-12 pr-6 flex items-center text-[14px] text-left hover:bg-[#272a2b]'
                                    onClick={selectHeaderColumns(name, market.id)}
                                >
                                    <label className='text-[14px] whitespace-nowrap overflow-hidden block uppercase'>
                                        {market.name}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ColumnDropdown