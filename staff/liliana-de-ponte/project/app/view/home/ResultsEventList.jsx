import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import Event from './Event'

export default function ResultsEventList() {
    const [searchParams] = useSearchParams()
    const [events, setEvents] = useState([])

    const q = searchParams.get('q') || ''
    const distance = Number(searchParams.get('distance') || '10')

    useEffect(() => {

        loadEvents()
    }, [q], distance)

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
        if (q) {
            navigator.geolocation.getCurrentPosition((position => {
                const coords = [position.coords.latitude, position.coords.longitude]

                try {
                    logic.searchEvents(q, distance, coords)
                        .then(events => setEvents(events))
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })

                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
            }), error => {
                console.error(error)

                alert(error.message)
            })
        }
    }

    return <section className="flex flex-col gap-1 w-full p-1 mt-1">
        {events.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            onEventLikeToggled={handleEventLikeToggled}
            onEventAttendanceToggled={handleEventAttendanceToggled}

        />)}
    </section>


}