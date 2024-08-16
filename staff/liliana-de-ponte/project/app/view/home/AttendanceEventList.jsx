import logic from '../../logic'

import { useState, useEffect } from 'react'

import Event from './Event'

export default function AttendanceEventList() {

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
            logic.getAllAttendanceEvent()
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
            // onEventEdited={handleEventEdited}
            onEventLikeToggled={handleEventLikeToggled}
            onEventAttendanceToggled={handleEventAttendanceToggled}

        />)}
    </section>

}