import logic from '../../logic'

import { useState, useEffect } from 'react'

import Event from './Event'

export default function EventList({ refreshStamp }) {

    const [events, setEvents] = useState([])

    useEffect(() => {

        loadEvents()
    }, [refreshStamp])

    const handleEventDeleted = () => {
        loadEvents()
    }

    // const handleEventEdited = () => {
    //     loadEvents()
    // }

    const handleEventLikeToggled = () => {
        loadEvents()
    }

    const handleEventAttendanceToggled = () => {
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

    return <section className="flex flex-col gap-1 w-full p-1 mt-1">
        {events.map(event => <Event
            event={event}
            key={event.id}
            onEventDeleted={handleEventDeleted}
            // onEventEdited={handleEventEdited}
            onEventLikeToggled={handleEventLikeToggled}
            onEventAttendanceToggled={handleEventAttendanceToggled}

        />)}

    </section>

}