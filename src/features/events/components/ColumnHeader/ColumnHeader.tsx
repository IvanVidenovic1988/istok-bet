import React, { FC } from "react";
import { SportMarket } from "../../../sidebar/types";

type Props = {
    columnMarkets: SportMarket[];
    date: string;
}
export const ColumnHeader: FC<Props> = ({ date, columnMarkets }) => {
    return (
        <div className='h-6 flex items-center justify-between bg-[#2c2e30] border-b-[1px] border-[#1a1c1d] rounded'>
            <div className='w-[55%] md:w-[45%] lg:w-[43%] 2xl:w-[45%] pl-3 text-[13px] text-[#acacad]'>
                {date}
            </div>
            <div className='w-[45%] md:w-[55%] lg:w-[55%] 2xl:w-[56%] flex justify-between md:pr-[7%] 2xl:pr-[4%]'>
                {columnMarkets.map((columnMarket) => (
                    <div
                        key={columnMarket.id}
                        className='w-full 2xl:w-[33%] flex items-center justify-around pl-4 lg:px-4'
                    >
                        {Object.values(columnMarket.outcomes).map((outcome) => (
                            <div key={outcome.id} className="flex items-center">
                                <span className='text-[14px] 2xl:text-[16px] text-[#acacad]'>{outcome.shortName}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColumnHeader;