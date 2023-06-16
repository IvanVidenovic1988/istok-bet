import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks';
import { fetchEvents } from '../redux/events';
import { TicketItem, addToTicket } from '../../ticket/redux/ticket';
import ColumnDropdown from './ColumnDropdown/ColumnDropdown';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import CompetitorNameAndTime from './CompetitorNameAndTime/CompetitorNameAndTime';
import ColumnOdds from './ColumnOdds/ColumnOdds';
import SingleEventAllMarkets from './SingleEventAllMarkets';
import { SingleEvent, setAllMarketsForSingleEvent, openAllMarketsForSingleEvent } from '../redux/singleEvent';


const DesktopEvents = () => {

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
    const visibleMarketsColumnTwo = visibleMarkets.slice(5, 10)
    const visibleMarketsColumnThree = visibleMarkets.slice(10, 15)

    const [headerColumns, setHeaderColumns] = useState<{
        columnOne: number | null;
        columnTwo: number | null;
        columnThree: number | null;
    }>({
        columnOne: null,
        columnTwo: null,
        columnThree: null,
    });
    console.log('headerColumns: ', headerColumns);

    const vizibleMarketsOnChange = useMemo(() => visibleMarkets.filter(vm => Object.values(headerColumns).includes(vm.id)), [visibleMarkets, headerColumns])
    console.log('vizibleMarketsOnChange: ', vizibleMarketsOnChange);


    useEffect(() => {
        if (visibleMarkets.length) {
            setHeaderColumns({
                columnOne: visibleMarketsColumnOne[0].id,
                columnTwo: visibleMarketsColumnTwo[0].id,
                columnThree: visibleMarketsColumnThree[0].id,
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
    console.log('activeMarketName: ', activeMarketName);
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
        <div className='w-[calc(100%-250px)] text-white ml-[50px] lg:ml-[250px]'>
            {events && Object.entries(events).map(([leagueName, eventsByDate]) => (
                <div
                    key={leagueName}
                    className='w-[calc(100%-320px)] mb-[14px]'
                >
                    <div className='h-[40px] flex items-center '>

                        <div className='w-[45%] pl-3 text-[18px] font-semibold'>
                            {leagueName}
                        </div>

                        <div className='w-[55%] flex justify-between pr-[5%] pb-[2px]'>
                            <ColumnDropdown
                                name='columnOne'
                                markets={visibleMarketsColumnOne}
                                selectHeaderColumns={selectHeaderColumns}
                                selectedColumnId={headerColumns.columnOne}
                                selectedColumDropdown={() => openColumn(leagueName, 'columnOne')}
                                isOpen={activeMarketName === leagueName + 'columnOne'}
                            />
                            <ColumnDropdown
                                name='columnTwo'
                                markets={visibleMarketsColumnTwo}
                                selectHeaderColumns={selectHeaderColumns}
                                selectedColumnId={headerColumns.columnTwo}
                                selectedColumDropdown={() => openColumn(leagueName, 'columnTwo')}
                                isOpen={activeMarketName === leagueName + 'columnTwo'}
                            />
                            <ColumnDropdown
                                name='columnThree'
                                markets={visibleMarketsColumnThree}
                                selectHeaderColumns={selectHeaderColumns}
                                selectedColumnId={headerColumns.columnThree}
                                selectedColumDropdown={() => openColumn(leagueName, 'columnThree')}
                                isOpen={activeMarketName === leagueName + 'columnThree'}
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
                                            className='w-full bg-[#242628] h-[40px] flex items-center justify-between border-b-[1px] border-[#1a1c1d] hover:bg-[#37383d]'
                                        >
                                            <CompetitorNameAndTime
                                                event={event}
                                            />
                                            <div className='w-[50%] flex'>
                                                <ColumnOdds
                                                    event={event}
                                                    handleAddToTicket={handleAddToTicket}
                                                    columnMarkets={vizibleMarketsOnChange}
                                                    headerColumns={headerColumns}
                                                />
                                            </div>
                                            <div onClick={() => handleAllMarketsForSingleEvent({
                                                id: event.id,
                                                name: event.name,
                                                competitors: event.competitors,
                                                tournamentName: event.tournamentName,
                                                date: date,
                                                startsAt: event.startsAt,
                                                markets: event.markets
                                            })}
                                                className='w-[5%] h-[40px] flex-center cursor-pointer hover:bg-[#4f5157]'>
                                                <span className='text-[14px] text-[#ffc107] font-bold'>+{event.totalMarkets}</span>

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

export default DesktopEvents