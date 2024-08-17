import logic from '../../logic/index.js'

import { useState } from 'react'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Label from '../library/Label.jsx'


export default function CreateEvent({ onEventCreated, onCancelCreateEvent }) {

    const [day, setDay] = useState(1)
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(2024)

    const handleDayChange = (event) => {
        setDay(Number(event.target.value));
    };

    const handleMonthChange = (event) => {
        setMonth(Number(event.target.value));
    };

    const handleYearChange = (event) => {
        setYear(Number(event.target.value));
    };

    const handleCreateEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const eventTitleInput = form['event-title-input']
        const eventOrganizerInput = form['event-organizer-input']
        const eventDate = new Date(year, month - 1, day).toISOString()

        // const eventDateInput = form['event-date-input']
        const eventDurationInput = form['event-duration-input']
        const eventDescriptionInput = form['event-description-input']
        const eventImageInput = form['event-image-input']
        const eventLatitudeInput = form['event-latitude-input']
        const eventLongitudeInput = form['event-longitude-input']

        const eventTitle = eventTitleInput.value
        const eventOrganizer = eventOrganizerInput.value
        // const eventDate = eventDateInput.value
        const eventDuration = eventDurationInput.value
        const eventDescription = eventDescriptionInput.value
        const eventImage = eventImageInput.value
        const eventLatitude = parseFloat(eventLatitudeInput.value.trim())
        const eventLongitude = parseFloat(eventLongitudeInput.value.trim())

        if (isNaN(eventLatitude) || isNaN(eventLongitude)) {
            alert('Latitude and Longitude must be valid numbers.');
            return;
        }
        const location = {
            type: 'Point',
            coordinates: [eventLatitude, eventLongitude]
        }

        try {
            logic.createEvent(eventTitle, eventOrganizer, eventDate, eventDuration, eventDescription, eventImage, location)
                .then(() => onEventCreated())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    const handleCancelCreateEventClick = () => {
        onCancelCreateEvent()
    }

    return <section>
        <Heading className="flex justify-center">Create Event</Heading>

        < Form className="flex-col gap-[0.9rem] min-w-[80%] mt-[40]" onSubmit={handleCreateEventSubmit} >
            <Container className="flex-col items-start">
                <Input className="w-11/12" id="event-title-input" placeholder='Event Title'></Input>
                <Input className="w-11/12" id="event-organizer-input" placeholder='Organizer Name'></Input>

                <Container className="flex gap-4">
                    <Label htmlFor="day-select">Day</Label>
                    <select value={day} onChange={handleDayChange}>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>

                    <Label htmlFor="month-select">Month</Label>
                    <select value={month} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>

                    <Label htmlFor="year-select">Year</Label>
                    <select value={year} onChange={handleYearChange}>
                        {Array.from({ length: 11 }, (_, i) => i + 2024).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </Container>


                <Input className="w-11/12" id="event-duration-input" placeholder='Duration of the event'></Input>
                <Input className="w-11/12" id="event-description-input" placeholder='Description of the event'></Input>
                <Input className="w-11/12" id="event-image-input" placeholder='Image of the event'></Input>

                <Container>
                    <Label htmlFor="Location">Location</Label>
                    <Input className="w-11/12" id="event-latitude-input" placeholder='Latitude'></Input>
                    <Input className="w-11/12" id="event-longitude-input" placeholder='Longitude'></Input>
                </Container>

                <Container className="justify-center gap-1rem">
                    <Button>Create</Button>
                    <Button onClick={handleCancelCreateEventClick}>Cancel</Button>
                </Container>

            </Container>

        </Form >
    </section >
}