import logic from '../../logic'
import { useState, useEffect } from 'react'
import useContext from '../context.js'
import Event from './Event'

export default function UserEventsLists() {
    // console.debug('UserEventsList -> call')
    const { alert } = useContext()

    const [events, setEvents] = useState([])

    useEffect(() => {
        // console.debug('UserEventsList -> useEffect')

        loadEvents()
    }, [])

    const handleEventDeleted = () => {
        // console.debug('UserEventsList -> handleEventDeleted')

        loadEvents()
    }

    const handleEventEdited = () => {
        // console.debug('UserEventsList -> handleEventEdited')

        loadEvents()
    }

    const handleEventLikeToggled = () => {
        // console.debug('UserEventsList -> handleEventLikeToggled')

        loadEvents()
    }

    const handleEventFavToggled = () => {
        // console.debug('UserEventsList -> handleEventFavToggled')

        loadEvents()
    }

    const handleUserFollowToggled = () => {
        // console.debug('UserEventsList -> handleUserFollowToggled')

        loadEvents()
    }

    const loadEvents = () => {
        try {
            logic.getAllEvents()
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

    return (
        <section className="flex flex-col gap-4">
            {events.map(event => (
                <Event
                    key={event.id}
                    event={event}
                    onEventDeleted={handleEventDeleted}
                    onEventEdited={handleEventEdited}
                    onEventLikeToggled={handleEventLikeToggled}
                    onEventFavToggled={handleEventFavToggled}
                    onUserFollowToggled={handleUserFollowToggled}
                />
            ))}
        </section>
    )
}
