import React, { FC } from 'react'
import { Event, Market } from '../../types';
import { TicketItem } from '../../../ticket/redux/ticket';
import { SportMarket } from '../../../sidebar/types';
import { useAppDispatch, useAppSelector } from '../../../../shared/redux/hooks';
import { getActiveOutcomeId } from '../../redux/events';

type Props = {
    event: Event;
    columnMarkets: SportMarket[];
    handleAddToTicket: (ticketItem: TicketItem) => void;
    headerColumns: {
        columnOne: number | null;
        columnTwo: number | null;
        columnThree: number | null;
    }
}

const ColumnOdds: FC<Props> = ({ event, columnMarkets, handleAddToTicket, headerColumns }) => {
    const activeOutcomeId = useAppSelector((state) => state.eventsData.activeOutcomeId)
    const dispatch = useAppDispatch()

    const getEventsVisibleMarkets = (eventsMarkets: Market[], visibleMarketsParametar: typeof columnMarkets) => {

        const unsortedVisibleMarkets = Object.values(eventsMarkets).filter(market => (visibleMarketsParametar).map(m => m.id).includes(market.marketId));
        const sortedVisibleMarkets = unsortedVisibleMarkets.sort((a, b) => a.marketId - b.marketId)
        const sortedAndFilteredVisibleMarkets = sortedVisibleMarkets.filter(
            (obj, index) =>
                sortedVisibleMarkets.findIndex((item) => item.marketId === obj.marketId) === index
        );
        return sortedAndFilteredVisibleMarkets
    }

    const kita = getEventsVisibleMarkets(Object.values(event.markets), columnMarkets)
    console.log('kita: ', kita);

    return (
        <>
            {Object.values(headerColumns).map(column => {
                const market = kita.find(k => k.marketId === column)
                console.log('market: ', market);

                if (!market) return <div className='w-[33%] flex items-center justify-around px-4'>-</div>

                return (
                    <div key={market.id} className='w-[33%] flex items-center justify-around px-4'>
                        {Object.values(market.outcomes).map(outcome => (
                            <div
                                key={outcome.id}
                                onClick={() => handleAddToTicket({
                                    id: event.id,
                                    name: event.name,
                                    marketsName: market.name,
                                    marketsSpecialValue: market.specialValues,
                                    tip: outcome.name,
                                    odd: outcome.odd,
                                    outcomeId: outcome.id
                                })}
                                className={`w-full h-[39px] flex items-center justify-around 
                                ${activeOutcomeId.includes(outcome.id) ? "bg-[#ffc107] border-r border-black text-black font-semibold" : "hover:bg-[#545657]"}`}
                            >
                                {/* <span>{market.specialValues}</span> */}
                                <span
                                    onClick={() => dispatch(getActiveOutcomeId(outcome.id))}
                                    className='w-full h-full cursor-pointer flex-center'
                                >
                                    {outcome.odd < 1 ? "-" : outcome.odd}
                                </span>


                            </div>
                        ))}

                    </div>
                )
            })}

        </>
    )
}

export default ColumnOdds