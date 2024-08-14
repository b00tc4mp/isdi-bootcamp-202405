import { useState, useEffect } from 'react'

import logic from '../../logic'
import Event from './Event'
import formatDate from '../../util/formatDate'

export default function EventList({ events }) {
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        setEventList(events)
    }, [events])

    // const handleEventDeleted = () => loadEvents()

    // const handleEventEdited = () => loadEvents()

    // const loadEvents = () => {
    //     try {
    //         logic.getAllEvents()
    //             .then(events => setEvents(events))
    //             .catch(error => {
    //                 console.error(error)

    //                 alert(error.message)
    //             })
    //     } catch (error) {
    //         console.error(error)

    //         alert(error.message)
    //     }
    // }

    // const filteredEvents = selectedDate
    //     ? events.filter(event => formatDate(new Date(event.startDate)) === formatDate(selectedDate))
    //     : []

    return <section>
        {eventList.map(event => <Event
            key={event.id}
            event={event}
        // onEventDeleted={handleEventDeleted}
        //TODO handleEdit
        />)}
    </section>
}