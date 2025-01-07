import React, { useState, useEffect } from 'react'
import getAllEvents from '../../logic/getAllEvents'
import Calendar from 'react-calendar'
import './calendar.css'
import 'react-calendar/dist/Calendar.css'

import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Image from '../library/Image'

const CalendarPage = () => {
  const [events, setEvents] = useState([])
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error('Error getting events date', error)
      }
    }

    fetchEvents()
  }, [])

  const eventDates = events.map(event => new Date(event.date))
  const locateDates = eventDates.map(date => date.toLocaleDateString())

  const hasEvent = (date) => {
    const locateDate = date.toLocaleDateString()
    return locateDates.includes(locateDate)
  }

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate)
    const foundEvent = events.find(event => new Date(event.date).toLocaleDateString() === selectedDate.toLocaleDateString())
    setSelectedEvent(foundEvent || null) // Set event if found, otherwise null
  }

  return (
    <Container className="flex flex-col items-center bg-transparent h-full w-screen">
      <main className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">

        {/* Calendar */}
        <Container className="w-full mb-6 font-poppins font-thin text-lg">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={({ date }) => {
              if (hasEvent(date)) {
                return 'font-bevan text-lg text-white bg-cities-gradient highlighted-day rounded-full w-10 h-10 flex items-center justify-center'
              }
              return 'font-bevan text-lg w-10 h-10 text-dark_white flex items-center justify-center'
            }}
            className="w-full h-auto border-none"
          />
        </Container>
        
        {selectedEvent && (
          <Container className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
          <Image src={selectedEvent.image} className="absolute inset-0 w-full h-full object-cover" />
          
          <Container className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
            <Heading level="3" className="text-2xl font-bold text-white">
              {selectedEvent.title}
            </Heading>
            
            <Paragraph className="text-sm text-gray-300 mb-2">
              {selectedEvent.description}
            </Paragraph>
            
            <Container className="font-semibold text-lg text-white">
              Event Date: {new Date(selectedEvent.date).toDateString()}
            </Container>
          </Container>
        </Container>
        )}
      </main>
    </Container>
  )
}

export default CalendarPage