import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import logic from '../../logic'
import Event from './Event'
import SearchEvent from './SearchEvent'
import Calendar from './Calendar'
import Heading from '../library/Heading'

export default function ResultsEventList() {
    const [searchParams] = useSearchParams()
    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [searchPerformed, setSearchPerformed] = useState(false)

    const q = searchParams.get('q') || ''
    const distance = Number(searchParams.get('distance') || '10')

    useEffect(() => {
        loadAllEvents()

        if (q) {
            setSearchPerformed(true)
            loadFilteredEvents()
        } else {
            setSearchPerformed(false)
            setFilteredEvents([])
        }
    }, [q, distance])

    const loadAllEvents = () => {
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

    const loadFilteredEvents = () => {
        if (q) {
            navigator.geolocation.getCurrentPosition(position => {
                const coords = [position.coords.latitude, position.coords.longitude]

                try {
                    logic.searchEvent(q, distance, coords)
                        .then(events => setFilteredEvents(events))
                        .catch(error => {
                            console.error(error)
                            alert(error.message)
                        })
                } catch (error) {
                    console.error(error)
                    alert(error.message)
                }
            }, error => {
                console.error(error)
                alert(error.message)
            })
        }
    }

    return (
        <section className='mt-[60px] flex flex-col gap-4'>
            <Heading className='mt-2 ml-2 text-2xl font-bold'>search</Heading>

            <SearchEvent />

            {searchPerformed ? (
                filteredEvents.length > 0 && filteredEvents.map(event => (
                    <Event key={event.id} event={event} />
                ))
            ) : (
                <Calendar events={events} />
            )}
        </section>
    )
}