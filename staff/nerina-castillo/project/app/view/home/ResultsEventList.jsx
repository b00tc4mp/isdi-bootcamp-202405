import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import logic from '../../logic'
import Event from './Event'
import SearchEvent from './SearchEvent'
import Calendar from './Calendar'
import Heading from '../library/Heading'

export default function ResultsEventList() {
    const [searchParams] = useSearchParams()
    const [filteredEvents, setFilteredEvents] = useState([])
    const [searchPerformed, setSearchPerformed] = useState(false)
    const [events, setEvents] = useState([])
    const [eventList, setEventList] = useState([])

    const q = searchParams.get('q') || ''
    const distance = Number(searchParams.get('distance') || '10')
    const date = searchParams.get('date')

    useEffect(() => {
        if (q || date) {
            setSearchPerformed(true)
            loadFilteredEvents()
        } else {
            setSearchPerformed(false)
            loadEventsByDate(date)
        }
    }, [q, distance, date])

    useEffect(() => {
        setEventList(events)
    }, [events])

    const handleEventDeleted = eventId => {
        setEventList(prevEvents => prevEvents.filter(event => event.id !== eventId))
        setFilteredEvents(prevFiltered => prevFiltered.filter(event => event.id !== eventId))
    }

    const handleEventEdited = updatedEvent => {
        setEventList(prevEvents => prevEvents.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ))
        setFilteredEvents(prevFiltered => prevFiltered.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ))
    }

    const loadEventsByDate = date => {
        if (!date) return

        try {
            logic.getAllEvents()
                .then(events => {
                    const filteredEvents = events.filter(event => event.startDate && event.startDate.slice(0, 10) === date.slice(0, 10))

                    setEvents(filteredEvents)
                    setEventList(filteredEvents)
                })
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
                        .then(events => {
                            setFilteredEvents(events)
                            setEventList(events)
                        })
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
        } else if (date) {
            try {
                logic.getEventByDate(new Date(date))
                    .then(events => {
                        setFilteredEvents(events)
                        setEventList(events)
                    })
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }

        }
    }

    return <section className='mt-[60px] flex flex-col gap-4'>
        <Heading className='mt-2 ml-2 text-2xl font-bold'>search</Heading>

        <SearchEvent />

        {searchPerformed ? (
            filteredEvents.length > 0 && filteredEvents.map(event => (
                <Event key={event.id}
                    event={event}
                    onEventDeleted={handleEventDeleted}
                    onEventEdited={handleEventEdited} />
            ))
        ) : (
            <Calendar />
        )}
    </section>

}
