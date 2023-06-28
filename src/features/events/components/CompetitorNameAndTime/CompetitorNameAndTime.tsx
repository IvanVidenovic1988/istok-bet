import React, { FC } from "react";
import { Event } from '../../types';

type Props = {
    event: Event;
}

export const CompetitorNameAndTime: FC<Props> = ({ event }) => {

    const prepareCompetitors = (event: Event) => {
        return Object.values(event.competitors).map(competitor => competitor.shortName).join(' - ')
    }

    return (
        <div className='w-[35%] md:w-[55%] lg:w-[45%] flex lg:items-center flex-col md:flex-row pl-3'>
            <div className='text-[14px] text-[#acacad]'>
                {event.startsAt.slice(11, 16)}
            </div>
            <div className='md:pl-3 text-[14px] '>
                {prepareCompetitors(event)}
            </div>
        </div>
    );
}

export default CompetitorNameAndTime;