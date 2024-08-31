import logic from '../../logic'

import { useState, useEffect } from 'react'

import Event from './Event'

export default function LikeEventList() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        loadEvents()
    }, [])

    const handleEventDeleted = () => {

        loadEvents()
    }

    const handleEventLikeToggled = () => {
        loadEvents()
    }

    const handleEventAttendanceToggled = () => {
        loadEvents()
    }

    const loadEvents = () => {
        try {
            logic.getAllLikeEvents()
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

    return <section className="flex flex-col gap-1 w-full p-1 mt-1">
        {events.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            // onEventEdited={handleEventEdited}
            onEventLikeToggled={handleEventLikeToggled}
            onEventAttendanceToggled={handleEventAttendanceToggled}

        />)}
    </section>

}