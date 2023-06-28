import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks';
import { SingleEvent } from '../redux/singleEvent';
import { TicketItem } from '../../ticket/redux/ticket';
import { getActiveOutcomeId } from '../redux/events';
import { filterButtons } from '../utils/utils';

type Props = {
    handleAddToTicket: (ticketItem: TicketItem) => void;
    closeModal: () => void;
}


const SingleEventAllMarkets: FC<Props> = ({ handleAddToTicket, closeModal }) => {
    const dispatch = useAppDispatch();
    const singleEvent = useAppSelector((state) => state.singleEventData.singleEvent)

    const [selectedMarketFilter, setSelectedMarketFilter] = useState('all')

    if (!singleEvent) return null;

    const filterMarkets = (e: any) => {

        const clickedFilter = e.target.value
        setSelectedMarketFilter(clickedFilter)
    }


    const filteredMarkets = Object.values(singleEvent.markets).filter(
        (market) => market.name.includes(selectedMarketFilter))
    const markets = selectedMarketFilter === 'all' ? Object.values(singleEvent?.markets) : filteredMarkets

    const activeOutcomeId = useAppSelector((state) => state.eventsData.activeOutcomeId)

    const prepareCompetitors = (singleEvent: SingleEvent) => {
        return Object.values(singleEvent.competitors).map(competitor => competitor.shortName).join(' - ')
    }


    return (
        <>
            <div className='w-[85%] md:w-[70%] lg:w-[60%] fixed top-[180px] right-[8px] xl:right-[312px] 2xl:right-[320px] z-50'>

                <div className='p-6 text-center bg-[#242628]'>
                    <div className='text-[24px]'>{singleEvent && prepareCompetitors(singleEvent)}</div>
                    <div>{singleEvent.tournamentName}</div>
                    <div>{singleEvent.date} - {singleEvent.startsAt.slice(11, 16)}</div>
                    <div onClick={closeModal} className='absolute top-0 right-[15px] text-[30px] cursor-pointer'>x</div>
                </div>

                <div className='sticky flex items-center justify-around w-full text-center bg-[#2c2e30]  border-t border-b border-[#3f4144]'>
                    {filterButtons.map((button) => (
                        <div
                            key={button.label}
                            onClick={filterMarkets}
                            className='h-[40px] flex-center grow hover:bg-[#ffbb1a] hover:text-[black] cursor-pointer'
                        >
                            <button
                                value={button.value}
                                className='h-[40px] overflow-hidden'
                            >
                                {button.label}
                            </button>
                        </div>
                    ))}
                </div>

                <div className='h-[63vh] overflow-y-scroll p-2 bg-[#2c2e30]'>
                    {markets.map(market =>
                        <div
                            key={market.id}
                            className='mb-4'
                        >
                            <div className='h-[40px] px-4 flex items-center'>
                                <span className='text-[14px] mr-2'>{market.name}</span>
                                {market.specialValues.valueOf() > 0 || market.specialValues.valueOf() < 0 ? <span>( {market.specialValues} )</span> : <span></span>}
                            </div>
                            <div className='flex flex-wrap items-center'>
                                {Object.values(market.outcomes).map(outcome =>
                                    <div
                                        key={outcome.id}
                                        onClick={() => dispatch(getActiveOutcomeId(outcome.id))}
                                        className={`
                                            ${Object.values(market.outcomes).length > 2 ? 'w-[33.33%]' : 'w-[50%]'} 
                                            ${activeOutcomeId.includes(outcome.id) ? "bg-[#ffc107] text-black font-semibold" : "bg-[#3f4144] hover:bg-[#545657]"}`}>
                                        <div
                                            onClick={() => handleAddToTicket({
                                                id: singleEvent.id,
                                                name: singleEvent.name,
                                                marketsName: market.name,
                                                marketsSpecialValue: market.specialValues,
                                                tip: outcome.name,
                                                odd: outcome.odd,
                                                outcomeId: outcome.id
                                            })}
                                            className='h-[40px] px-4 flex items-center justify-between  border-r border-b border-opacity-40 border-black cursor-pointer'
                                        >
                                            <span className=''>{outcome.name}</span>
                                            <span className=''>{outcome.odd}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SingleEventAllMarkets;