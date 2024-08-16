import { useState, useEffect } from 'react'

import logic from '../../logic'
import Event from './Event'

export default function EventList({ events }) {
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        setEventList(events)
    }, [events])

    const handleEventDeleted = () => loadEvents()

    const handleEventEdited = () => loadEvents()

    const loadEvents = () => {
        try {
            logic.getAllEvents()
                .then(events => setEventList(events))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section>
        {eventList.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            onEventEdited={handleEventEdited}
        />)}
    </section>
}