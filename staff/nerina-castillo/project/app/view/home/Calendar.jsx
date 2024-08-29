import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../library/Container'
import Button from '../library/Button'
import formatDate from '../../util/formatDate'
import logic from '../../logic'

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [filteredEvents, setFilteredEvents] = useState([])
    const [events, setEvents] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const startDay = startOfMonth.getDay()
    const daysInMonth = endOfMonth.getDate()

    useEffect(() => {
        if (selectedDate) {
            const updatedEvents = events.filter(event => {
                const eventStartDate = new Date(event.startDate)

                return formatDate(eventStartDate) === formatDate(selectedDate)
            })
            setFilteredEvents(updatedEvents)
        }
    }, [selectedDate])

    useEffect(() => {
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
    }, [])

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
        setSearchParams({ date: date.toISOString() })
    }

    const days = []
    for (let i = 0; i < startDay; i++) {
        days.push(<Container key={`empty-${i}`} className='border p-2' />)
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        const dayEvents = events.filter(event =>
            new Date(event.startDate).toDateString() === dayDate.toDateString()
        )

        days.push(
            <div
                key={i}
                className={`border p-2 ${selectedDate && selectedDate.getDate() === i ? 'selected' : ''}`}
                onClick={() => handleDayClick(i)}
            >
                {i}
                {dayEvents.length > 0 && (
                    <div className='mt-1 text-xs text-slate-300'>
                        {dayEvents.slice(0, 3).map((event, index) => (
                            <div key={index} className='truncate'>
                                {event.title}
                            </div>
                        ))}
                        {dayEvents.length > 3 && <div className='mt-1 text-slate-500'>+{dayEvents.length - 3} more</div>}
                    </div>
                )}
            </div>
        )
    }

    return <section>
        <Container className='pb-[70px] ml-1 mr-1'>

            <Container className='flex justify-around items-center mb-4'>
                <Button onClick={handlePrevMonth} className='p-2 border-none'>&lt;</Button>
                <span className='text-lg font-semibold'>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
                <Button onClick={handleNextMonth} className='p-2 border-none'>&gt;</Button>
            </Container>

            <Container className='grid grid-cols-7 text-center font-semibold'>
                <Container>sun</Container>
                <Container>mon</Container>
                <Container>tue</Container>
                <Container>wed</Container>
                <Container>thu</Container>
                <Container>fri</Container>
                <Container>sat</Container>
            </Container>

            <Container className='grid grid-cols-7 gap-1'>
                {days}
            </Container>
        </Container>
    </section>
}