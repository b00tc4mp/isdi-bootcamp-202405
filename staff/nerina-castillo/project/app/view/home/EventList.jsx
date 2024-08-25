import { useState, useEffect } from 'react'
import logic from '../../logic'
import Event from './Event'
import Button from '../library/Button'
import Image from '../library/Image'

export default function EventList({ events, onBack }) {
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        setEventList(events)
    }, [events])

    const handleEventDeleted = (eventId) => setEventList(prevEvents => prevEvents.filter(event => event.id !== eventId))

    const handleEventEdited = editedEventDate => loadEventsByDate(editedEventDate)

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

    const loadEventsByDate = (date) => {
        if (!date) return

        try {
            logic.getAllEvents()
                .then(events => {
                    const filteredEvents = events.filter(event => event.startDate && event.startDate.slice(0, 10) === date.slice(0, 10));
                    setEventList(filteredEvents);
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return <section className='mb-[-65px] flex flex-col'>
        <Button onClick={onBack}>
            <Image src='./back.png' className='w-[20px] h-[20px] mb-4' />
        </Button>

        {eventList.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            onEventEdited={handleEventEdited}
        />)}
    </section>
}