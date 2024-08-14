import { useState, useEffect } from 'react'

import Container from '../library/Container'
import Button from '../library/Button'
import formatDate from '../../util/formatDate'
import EventList from './EventList'

export default function Calendar({ events = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [view, setView] = useState('calendar')

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const startDay = startOfMonth.getDay()
    const daysInMonth = endOfMonth.getDate()

    useEffect(() => {
        console.log(events)
    }, [events])

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
        setSelectedDate(null)
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
        setSelectedDate(null)
    }

    const handleDayClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        setSelectedDate(date)
        setView('events')
    }

    const filteredEvents = selectedDate
        ? events.filter(event => formatDate(new Date(event.startDate)) === formatDate(selectedDate))
        : []

    const days = []
    for (let i = 0; i < startDay; i++) {
        days.push(<Container key={`empty-${i}`} className="empty-day" />)
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        const dayEvents = events.filter(event =>
            new Date(event.startDate).toDateString() === dayDate.toDateString()
        )

        days.push(
            <Container
                key={i}
                className={`day ${selectedDate && selectedDate.getDate() === i ? 'selected' : ''}`}
                onClick={() => handleDayClick(i)}>{i}{dayEvents.length > 0 && (
                    <Container >{dayEvents.slice(0, 3).map((event, index) => (
                        <Container key={index} >{event.description}</Container>))}

                        {dayEvents.length > 3 &&

                            <Container >+{dayEvents.length - 3} more</Container>}
                    </Container>)}
            </Container>)
    }

    return (
        <Container>
            {view === 'calendar' ? (
                <>
                    <Container>
                        <Button onClick={handlePrevMonth}>&lt;</Button>
                        <span>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
                        <Button onClick={handleNextMonth}>&gt;</Button>
                    </Container>

                    <Container>{days}</Container>
                </>
            ) : (
                <EventList events={filteredEvents} onBack={() => setView('calendar')} />
            )}
        </Container>
    )
}