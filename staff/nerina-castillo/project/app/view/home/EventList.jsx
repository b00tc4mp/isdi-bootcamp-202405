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

    const handleEventDeleted = () => loadEvents()

    const handleEventEdited = () => loadEvents()

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

    return <section className=' mb-[-20px] flex flex-col gap-4'>
        <Button onClick={onBack}>
            <Image src='./back.png' className="w-[20px] h-[20px]" />
        </Button>

        {eventList.map(event => <Event
            key={event.id}
            event={event}
            onEventDeleted={handleEventDeleted}
            onEventEdited={handleEventEdited}
        />)}
    </section>
}