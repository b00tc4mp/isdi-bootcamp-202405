import { useState, useEffect } from 'react'
import useContext from '../context.js'
import logic from '../../logic'
import Event from './Event'

export default function EventsList({ user, refreshStamp }) {
    // console.debug('EventsList -> call')
    const { alert } = useContext()

    const [events, setEvents] = useState([])

    useEffect(() => {
        // console.debug('EventsList -> useEffect')

        loadEvents()

    }, [refreshStamp])

    const handleEventDeleted = () => {
        // console.debug('EventsList -> handleEventDeleted')

        loadEvents()
    }

    const handleEventEdited = () => {
        // console.debug('EventsList -> handleEventEdited')

        loadEvents()
    }

    const handleEventGoingToggled = () => {
        // console.debug('EventsList -> handleEventGoingToggled')

        loadEvents()
    }

    const handleEventFavToggled = () => {
        // console.debug('EventsList -> handleEventFavToggled')

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
        <>
            <section className="flex flex-wrap flex-cols-1 md:flex-cols-2 lg:flex-cols-3 gap-4 w-full max-w-screen-xl overflow-hidden">
                {events.map(event =>
                    <Event
                        key={event.id}
                        event={event}
                        user={user}
                        onEventDeleted={handleEventDeleted}
                        onEventEdited={handleEventEdited}
                        onEventGoingToggled={handleEventGoingToggled}
                        onEventFavToggled={handleEventFavToggled}
                    />)}
            </section>
        </>
    )
}