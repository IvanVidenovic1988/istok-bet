import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/redux/hooks';
import { fetchEvents } from '../redux/events';
import { Event } from '../types';


const Events = () => {

    const { sportSlug } = useParams();
    const { categorySlug } = useParams();
    const { tournamentSlug } = useParams();

    const sportId = sportSlug?.split("-")[0] as string
    const categoryId = categorySlug?.split("-")[0] as string
    const tournamentId = tournamentSlug?.split("-")[0] as string


    const events = useAppSelector((state) => state.eventsData.events)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchEvents({ sportId, categoryId, tournamentId }))
    }, [sportId, categoryId, tournamentId, dispatch])

    // console.log('sportEventsId: ', sportId);
    // console.log('events: ', events);
    // console.log('categoryEventId: ', categoryId);
    // console.log('tournamentEventId: ', tournamentId);

    const prepareCompetitors = (event: Event) => {
        return Object.values(event.competitors).map(competitor => competitor.shortName).join(' - ')
    }

    return (
        <div className='text-white'>
            {events && Object.entries(events).map(([leagueName, eventsByDate]) => (
                <div key={leagueName}>
                    <div>{leagueName}</div>
                    <div>{Object.entries(eventsByDate).map(([date, events]) => (
                        <div key={date}>
                            <div>{date}</div>
                            {events.map(event => (
                                <div key={event.id}>
                                    <span>{prepareCompetitors(event)}</span>
                                </div>
                            ))}
                        </div>))}</div>
                </div>
            ))}

        </div>
    )

}

export default Events
