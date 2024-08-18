import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import logic from '../../logic'
import Event from './Event'
import Heading from '../library/Heading'
import SearchEvent from './SearchEvent'

export default function ResultsEventList() {
    const [searchParams] = useSearchParams()
    const [events, setEvents] = useState([])

    const q = searchParams.get('q') || ''
    const distance = Number(searchParams.get('distance') || '10')

    useEffect(() => {
        loadEvents()
    }, [q], distance)

    const loadEvents = () => {
        if (q) {
            navigator.geolocation.getCurrentPosition((position => {
                const coords = [position.coords.latitude, position.coords.longitude]

                try {
                    logic.searchEvent(q, distance, coords)
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

    return <section>
        <SearchEvent />

        <Heading level='2'>Events</Heading>

        {events.map(event => <Event
            hey={event.id}
            event={event}
        />)}
    </section>
}