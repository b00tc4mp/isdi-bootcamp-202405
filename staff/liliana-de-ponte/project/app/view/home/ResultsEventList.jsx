import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import Event from './Event'

export default function ResultsEventList({ refreshStamp }) {
    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [events, setEvents] = useState([])

    useEffect(() => {

        loadEvents()
    }, [refreshStamp])

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
            logic.searchEvents(q)
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