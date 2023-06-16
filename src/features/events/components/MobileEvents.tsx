import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks';
import { fetchEvents } from '../redux/events';
import { Event, Market } from '../types';
import { TicketItem, addToTicket } from '../../ticket/redux/ticket';


const MobileEvents = () => {

    const { sportSlug } = useParams();
    const { categorySlug } = useParams();
    const { tournamentSlug } = useParams();

    const sportId = sportSlug?.split("-")[0] as string
    const categoryId = categorySlug?.split("-")[0] as string
    const tournamentId = tournamentSlug?.split("-")[0] as string


    const sports = useAppSelector((state) => state.sidebarData.sports)
    const events = useAppSelector((state) => state.eventsData.events)

    const visibleMarkets = Object.values(sports.find((sport) => sport.id.toString() === sportId)?.markets || {}).slice(0, 1)

    const getEventsVisibleMarkets = (eventsMarkets: Market[], visibleMarketsParametar: typeof visibleMarkets) => {

        const unsortedVisibleMarkets = Object.values(eventsMarkets).filter(market => (visibleMarketsParametar).map(m => m.id).includes(market.marketId));
        const sortedVisibleMarkets = unsortedVisibleMarkets.sort((a, b) => a.marketId - b.marketId)

        return sortedVisibleMarkets
    }


    const prepareCompetitors = (event: Event) => {
        return Object.values(event.competitors).map(competitor => competitor.shortName).join(' - ')
    }


    const dispatch = useAppDispatch()

    const handleAddToTicket = (ticketItem: TicketItem) => {
        dispatch(addToTicket(ticketItem))
    }

    useEffect(() => {
        dispatch(fetchEvents({ sportId, categoryId, tournamentId }))
    }, [sportId, categoryId, tournamentId, dispatch])


    // const prepareMarkets = (market: Market) => {
    //     return Object.values(market.outcomes).map((outcome) => (outcome.odd)).join(' - ')
    // }

    return (
        <div className='text-white ml-[50px] lg:ml-[300px] lg:mt-[40px]'>

            {events && Object.entries(events).map(([leagueName, eventsByDate]) => (
                <div
                    key={leagueName}
                    className='mb-[14px]'>
                    <div className='h-[40px] mb-2 flex items-center justify-between'>
                        <div className='w-[60%] pl-3 text-[18px] font-semibold'>
                            {leagueName}
                        </div>
                        <div className='w-[40%] h-[40px] flex items-center justify-around hover:bg-[#232627] cursor-pointer'>
                            {visibleMarkets.map((visibleMarket) =>
                                <div
                                    key={visibleMarket.id}
                                    className='flex items-center justify-between px-4 text-center'
                                >
                                    <span className='text-[14px] uppercase'>
                                        {/* {(visibleMarket.name).split(' ')[0] + ' ' + (visibleMarket.name).split(' ')[1]} */}
                                        {visibleMarket.name}
                                    </span>
                                    <img
                                        src="/images/arrow-down-white.png"
                                        className='w-[8px] h-[8px] '
                                    ></img>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>{Object.entries(eventsByDate).map(([date, events]) => (
                        <div key={date}>
                            <div className='h-6  flex items-center justify-between bg-[#2c2e30] border-b-[1px] border-[#1a1c1d]'>
                                <div className='w-[60%] pl-3 text-[#acacad]'>
                                    {date}
                                </div>
                                <div className='w-[40%] '>
                                    {visibleMarkets.map((visible) => (
                                        <div
                                            key={visible.id}
                                            className='flex items-center justify-around'
                                        >
                                            {Object.values(visible.outcomes).map((outcome) => (
                                                <div key={outcome.id}>
                                                    <span className='text-[#acacad]'>{outcome.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {events.map(event => (
                                <div
                                    key={event.id}
                                    className='w-full bg-[#242628] h-[90px] flex items-center justify-between border-b-[1px] border-[#1a1c1d] hover:bg-[#37383d]'
                                >
                                    <div className='w-[60%] pl-3 py-3'>
                                        <div className='text-[14px] text-[#acacad]'>
                                            {event.startsAt.slice(11, 16)}
                                        </div>
                                        <div className='text-[14px]'>
                                            {prepareCompetitors(event)}
                                        </div>
                                    </div>
                                    <div className='w-[40%]'>
                                        {getEventsVisibleMarkets(Object.values(event.markets), visibleMarkets).map(market => (
                                            <div key={market.id} className='flex items-center justify-around'>
                                                {/* <div>{prepareMarkets(market)}</div> */}
                                                {Object.values(market.outcomes).map(outcome => (
                                                    <div
                                                        key={outcome.id}
                                                        className='w-[33%] h-[88px] flex items-center justify-around hover:bg-[#4f5157]'
                                                    >
                                                        <span
                                                            onClick={() => handleAddToTicket({
                                                                id: event.id,
                                                                name: event.name,
                                                                marketsName: market.name,
                                                                marketsSpecialValue: market.specialValues,
                                                                tip: outcome.name,
                                                                odd: outcome.odd,
                                                                outcomeId: outcome.id
                                                            })}
                                                            className='cursor-pointer'
                                                        >{outcome.odd}</span>
                                                    </div>

                                                ))}

                                            </div>

                                        ))}

                                    </div>
                                </div>

                            ))}

                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileEvents