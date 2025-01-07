import { useState, useEffect } from 'react'
import useContext from '../context.js'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import Event from './Event'

export default function ResultsEventsList({ refreshStamp }) {
    // console.debug('ResultsEventList -> call')
    const { alert } = useContext()

    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [events, setEvents] = useState([])

    useEffect(() => {
        // console.debug('ResultsEventList -> useEffect [refreshStamp, q]')

        loadEvents()
    }, [refreshStamp, q])

    const handleEventDeleted = () => {
        // console.debug('ResultsEventList -> handleEventDeleted')

        loadEvents()
    }

    const handleEventEdited = () => {
        // console.debug('ResultsEventList -> handleEventEdited')

        loadEvents()
    }

    const handleEventLikeToggled = () => {
        // console.debug('ResultsEventList -> handleEventLikeToggled')

        loadEvents()
    }

    const handleEventFavToggled = () => {
        // console.debug('ResultsEventList -> handleEventFavToggled')

        loadEvents()
    }

    const handleUserFollowToggled = () => {
        // console.debug('ResultsEventList -> handleUserFollowToggled')

        loadEvents()
    }

    const loadEvents = () => {
        try {
            logic.searchEvent(q)
                .then(events => setEvents(events))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section className="flex flex-col gap-4">
        {events.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            onEventEdited={handleEventEdited}
            onEventLikeToggled={handleEventLikeToggled}
            onEventFavToggled={handleEventFavToggled}
            onUserFollowToggled={handleUserFollowToggled}
        />)}
    </section>
}