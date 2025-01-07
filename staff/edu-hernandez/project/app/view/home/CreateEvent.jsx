import { useState, useEffect } from 'react'
import useContext from '../context.js'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import logic from '../../logic'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'
import formatDate from '../../util/formatDate.js'

export default function CreateEvent({ onEventCreated, onCancelCreateEvent }) {
    // console.debug('CreateEvent -> call')
    const { alert } = useContext()

    const [formattedDate, setFormattedDate] = useState(new Date())
    const [currentTime, setCurrentTime] = useState('')
    const [CalendarOpen, setCalendarOpen] = useState(false)
    const [eventTime, setEventTime] = useState('')

    useEffect(() => {
        // console.debug('CreateEvent -> useEffect')

        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        setCurrentTime(`${hours}:${minutes}`)
        setEventTime(`${hours}:${minutes}`)
    }, [])

    const parseCoordinates = (coordinatesString) => {
        const coordinates = coordinatesString.split(',').map(coord => parseFloat(coord.trim()))

        if (coordinates.length !== 2 || coordinates.some(isNaN)) {
            throw new Error('Invalid coordinates format. Please provide valid latitude and longitude.')
        }

        const [latitude, longitude] = coordinates
        if (latitude < -90 || latitude > 90) {
            throw new Error('Latitude must be between -90 and 90.')
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error('Longitude must be between -180 and 180.')
        }

        return coordinates
    }

    const handleCreateEventSubmit = event => {
        // console.debug('CreateEvent -> handleCreateEventSubmit')

        event.preventDefault()

        const form = event.target

        const eventTitle = form['event-title-input'].value
        const eventImage = form['event-image-input'].value
        const eventCaption = form['event-caption-input'].value
        const eventLocation = form['event-location-input'].value
        const eventTime = form['event-time-input'].value

        try {
            const location = {
                coordinates: parseCoordinates(eventLocation),
                type: 'Point'
            }

            logic.createEvent(eventTitle, eventImage, eventCaption, formattedDate, location, eventTime)
                .then(() => onEventCreated())
                .catch(error => alert(error.message))

        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelCreateEventClick = () => {
        // console.debug('CreateEvent -> handleCancelCreateEventClick')

        onCancelCreateEvent()
    }

    const handleToggleCalendar = () => {
        // console.debug('CreateEvent -> handleToggleCalendar')

        setCalendarOpen(!CalendarOpen)
    }

    const handleDateChange = (date) => {
        // console.debug('CreateEvent -> handleDateChange')

        setFormattedDate(date)
        setCalendarOpen(false)
    }

    const timeOptions = Array.from({ length: 24 }, (_, i) => (
        <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
            {`${String(i).padStart(2, '0')}:00`}
        </option>
    ))

    return (
        <>
            {/* Blur Background */}
            <div className="fixed !m-0 inset-0 bg-black bg-opacity-50 backdrop-blur-sm  z-10"></div>

            {/* CreateEvent Card */}
            <section className="fixed bottom-14 left-0 w-full 
        bg-white shadow-2xl rounded-xl 
        border-t-dark_white 
        dark:bg-background_grey 
        dark:text-white p-2 box-border border-t 
        dark:border-t-light_grey z-20">

                <Heading className="font-bevan text-2xl text-bold pt-4 pl-5 text-cities" level={2}>Create Event</Heading>

                <Form className="flex-col font-poppins text-[14px]" onSubmit={handleCreateEventSubmit}>
                    <Container className="flex-col">
                        <Container className="flex-col items-start text-light_grey">
                            <Label htmlFor="event-title-input">Event Title</Label>
                            <Input className="text-light_grey" id="event-title-input" />
                        </Container>

                        <Container className="flex-col items-start text-light_grey">
                            <Label htmlFor="event-image-input">Image</Label>
                            <Input className="text-light_grey" id="event-image-input" />
                        </Container>

                        <Container className="flex-col items-start text-light_grey">
                            <Label htmlFor="event-caption-input">Description</Label>
                            <Input className="text-light_grey" id="event-caption-input" />
                        </Container>

                        <Container className="flex-col items-start text-light_grey">
                            <Label htmlFor="event-date-input">Date</Label>
                            <Input
                                id="event-date-input"
                                readOnly
                                value={formattedDate.toLocaleDateString()}
                                onClick={handleToggleCalendar}
                            />
                            {CalendarOpen && <Calendar onChange={handleDateChange} value={formattedDate} />}
                        </Container>

                        <Container className="flex-col items-start text-light_grey">
                            <Label htmlFor="event-location-input">Location</Label>
                            <Input
                                className="text-light_grey"
                                id="event-location-input"
                                placeholder="Enter coordinates (lat, long)"
                                defaultValue="41.38879, 2.15899"
                            />
                        </Container>

                        <Container className="flex-col items-start text-light_grey">
                            <Label htmlFor="event-time-input">Time</Label>
                            <select id="event-time-input" value={eventTime} onChange={event => setEventTime(event.target.value)}>
                                {timeOptions}
                            </select>
                        </Container>

                        <Container className="flex justify-between mt-4">
                            <Button className="text-white bg-grass p-2 rounded" type="submit">Submit</Button>
                            <Button className="font-modersutic dark:text-dark_white" type="reset" onClick={handleCancelCreateEventClick}>Cancel</Button>
                        </Container>

                    </Container>
                </Form>
            </section>
        </>
    )
}