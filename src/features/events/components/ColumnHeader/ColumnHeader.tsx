import React, { FC } from "react";
import { SportMarket } from "../../../sidebar/types";

type Props = {
    columnMarkets: SportMarket[];
    date: string;
}
export const ColumnHeader: FC<Props> = ({ date, columnMarkets }) => {
    return (
        <div className='h-6 flex items-center justify-between bg-[#2c2e30] border-b-[1px] border-[#1a1c1d]'>
            <div className='w-[45%] pl-3 text-[13px] text-[#acacad]'>
                {date}
            </div>
            <div className='w-[55%] flex justify-between pr-[5%]'>
                {columnMarkets.map((columnMarket) => (
                    <div
                        key={columnMarket.id}
                        className='w-[33%] flex items-center justify-around px-4'
                    >
                        {Object.values(columnMarket.outcomes).map((outcome) => (
                            <div key={outcome.id}>
                                <span className='text-[#acacad]'>{outcome.shortName}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColumnHeader;