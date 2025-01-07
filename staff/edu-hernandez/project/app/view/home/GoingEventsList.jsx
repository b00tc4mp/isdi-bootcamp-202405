import { useState, useEffect } from 'react'
import useContext from '../context.js'
import logic from '../../logic'
import Event from './Event'

export default function GoingEventsList() {
    // console.debug('GoingEventsList -> call')
    const { alert } = useContext()

    const [events, setEvents] = useState([])

    useEffect(() => {
        // console.debug('GoingEventsList -> useEffect')

        loadEvents()
    }, [])

    const handleEventDeleted = () => {
        // console.debug('GoingEventsList -> handleEventDeleted')

        loadEvents()
    }

    const handleEventEdited = () => {
        // console.debug('GoingEventsList -> handleEventEdited')

        loadEvents()
    }

    const handleEventFavToggled = () => {
        // console.debug('GoingEventsList -> handleEventFavToggled')

        loadEvents()
    }

    const handleEventGoingToggled = () => {
        // console.debug('GoingEventsList -> handleEventGoingList')

        loadEvents()
    }

    const loadEvents = () => {
        try {
            logic.getAllGoingEvents()
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
            onEventGoingToggled={handleEventGoingToggled}
            onEventFavToggled={handleEventFavToggled}
        />)}
    </section>
}