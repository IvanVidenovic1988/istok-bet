import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks';
import { fetchEvents } from '../redux/events';
import { TicketItem, addToTicket } from '../../ticket/redux/ticket';
import ColumnDropdown from './ColumnDropdown/ColumnDropdown';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import CompetitorNameAndTime from './CompetitorNameAndTime/CompetitorNameAndTime';
import SingleEventAllMarkets from './SingleEventAllMarkets';
import { SingleEvent, setAllMarketsForSingleEvent } from '../redux/singleEvent';
import MobileColumnOdds from './ColumnOdds/MobileColumnOdds';


const MobileEvents = () => {

    const { sportSlug } = useParams();
    const { categorySlug } = useParams();
    const { tournamentSlug } = useParams();

    const sportId = sportSlug?.split("-")[0] as string
    const categoryId = categorySlug?.split("-")[0] as string
    const tournamentId = tournamentSlug?.split("-")[0] as string

    const dispatch = useAppDispatch()

    const sports = useAppSelector((state) => state.sidebarData.sports) //nazivi
    const events = useAppSelector((state) => state.eventsData.events)  //kvote

    console.log('sports: ', sports);
    console.log('events: ', events);


    const visibleMarkets = Object.values(sports.find((sport) => sport.id.toString() === sportId)?.markets || {})

    const visibleMarketsColumnOne = visibleMarkets.slice(0, 5)

    const [headerColumns, setHeaderColumns] = useState<{
        columnOne: number | null;
    }>({
        columnOne: null,
    });

    const vizibleMarketsOnChange = useMemo(() => visibleMarkets.filter(vm => Object.values(headerColumns).includes(vm.id)), [visibleMarkets, headerColumns])

    useEffect(() => {
        if (visibleMarkets.length) {
            setHeaderColumns({
                columnOne: visibleMarketsColumnOne[0].id,
            })
        }
    }, [visibleMarkets.length])

    const selectHeaderColumns = (name: string, id: number) => (e: any) => {
        setHeaderColumns((state) => {
            return {
                ...state,
                [name]: Number(id)
            }
        })
    }

    const handleAddToTicket = (ticketItem: TicketItem) => {
        dispatch(addToTicket(ticketItem))
    }

    const [activeMarketName, setActiveMarketName] = useState<string>('')

    const openColumn = (leagueName: string, column: string) => {
        const name = leagueName + column
        setActiveMarketName((n) => n === name ? '' : name)
    }

    useEffect(() => {
        dispatch(fetchEvents({ sportId, categoryId, tournamentId }))
    }, [sportId, categoryId, tournamentId, dispatch])

    const [allMarketsOpen, setAllMarketsOpen] = useState<number | null>(null);

    const openAllMarketsModal = (id: number) => {
        setAllMarketsOpen((marketId) => marketId === id ? null : id)
    }

    const handleAllMarketsForSingleEvent = (event: SingleEvent) => {
        dispatch(setAllMarketsForSingleEvent(event))
        openAllMarketsModal(event.id)
        setActiveMarketName("zatvori")
    }


    return (
        <div className='pl-[6px] text-white ml-[50px] pr-[3px]'>
            {events && Object.entries(events).map(([leagueName, eventsByDate]) => (
                <div
                    key={leagueName}
                    className='mb-[14px]'
                >
                    <div className='h-[60px] flex items-center'>

                        <div className='w-[60%] pl-3 text-[18px] font-semibold flex items-center'>
                            <span className='pr-6'>{leagueName}</span>
                        </div>


                        <div className='w-[40%] flex justify-between'>
                            <ColumnDropdown
                                name='columnOne'
                                markets={visibleMarketsColumnOne}
                                selectHeaderColumns={selectHeaderColumns}
                                selectedColumnId={headerColumns.columnOne}
                                selectedColumDropdown={() => openColumn(leagueName, 'columnOne')}
                                isOpen={activeMarketName === leagueName + 'columnOne'}
                            />
                        </div>
                    </div>
                    <div>
                        {Object.entries(eventsByDate).map(([date, events]) => {
                            return (
                                <div key={date}>
                                    <ColumnHeader
                                        date={date}
                                        columnMarkets={vizibleMarketsOnChange}
                                    />
                                    {events.map(event => (
                                        <div
                                            key={event.id}
                                            className='w-full bg-[#242628] h-[90px] flex items-center justify-between border-b-[1px] border-[#1a1c1d] hover:bg-[#37383d] rounded'
                                        >
                                            <CompetitorNameAndTime
                                                event={event}
                                            />

                                            <div onClick={() => handleAllMarketsForSingleEvent({
                                                id: event.id,
                                                name: event.name,
                                                competitors: event.competitors,
                                                tournamentName: event.tournamentName,
                                                date: date,
                                                startsAt: event.startsAt,
                                                markets: event.markets
                                            })}
                                                className='w-[10%] h-[40px] flex-center cursor-pointer hover:bg-[#4f5157]'>
                                                <span className='text-[14px] text-[#ffc107] font-bold'>+{event.totalMarkets}</span>
                                            </div>

                                            <div className='w-[39%]'>
                                                <MobileColumnOdds
                                                    event={event}
                                                    handleAddToTicket={handleAddToTicket}
                                                    columnMarkets={vizibleMarketsOnChange}
                                                    headerColumns={headerColumns}
                                                />
                                            </div>

                                            {allMarketsOpen === event.id &&
                                                <SingleEventAllMarkets
                                                    handleAddToTicket={handleAddToTicket}
                                                    closeModal={() => { setAllMarketsOpen(null) }}
                                                />
                                            }
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileEvents
