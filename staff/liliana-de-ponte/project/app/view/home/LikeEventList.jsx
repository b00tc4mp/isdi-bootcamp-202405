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

    // const handleEventAttendeeToggled =()=> {
    //     loadEvents()
    // }

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

    return <section className="flex flex-col gap-4">
        {events.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            // onEventEdited={handleEventEdited}
            onEventLikeToggled={handleEventLikeToggled}
        // onEventAttendeeToggled={handleEventAttendeeToggled}

        />)}
    </section>

}