import logic from '../../logic/index.js'

import { useState } from 'react'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Label from '../library/Label.jsx'


export default function CreateEvent({ onEventCreated, onCancelCreateEvent }) {

    const handleCreateEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const eventTitleInput = form['event-title-input']
        const eventOrganizerInput = form['event-organizer-input']
        const eventDateInput = form['event-date-input']
        const eventDurationInput = form['event-duration-input']
        const eventDescriptionInput = form['event-description-input']
        const eventImageInput = form['event-image-input']
        const eventLatitudeInput = form['event-latitude-input']
        const eventLongitudeInput = form['event-longitude-input']

        const eventTitle = eventTitleInput.value
        const eventOrganizer = eventOrganizerInput.value
        const eventDate = new Date(eventDateInput.value)
        const eventDuration = eventDurationInput.value
        const eventDescription = eventDescriptionInput.value
        const eventImage = eventImageInput.value
        const eventLatitude = parseFloat(eventLatitudeInput.value.trim())
        const eventLongitude = parseFloat(eventLongitudeInput.value.trim())

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

    return <section className=" bg-[#FFEBF4]">
        <Heading className="flex justify-center text-[#050968] font-bold gap-2">Create Event</Heading>

        < Form className="flex-col gap-[0.9rem] min-w-[80%] mt-[40]" onSubmit={handleCreateEventSubmit} >
            <Container className="flex-col items-center gap-1.5">
                <Input className="w-11/12" id="event-title-input" placeholder='Event Title'></Input>
                <Input className="w-11/12" id="event-organizer-input" placeholder='Organizer Name'></Input>

                <Container className="w-11/12">
                    <Label className="text-[#050968]" htmlFor="date-select" >Date of the event </Label>
                    <Input id="event-date-input" type="date"></Input>
                </ Container>

                <Input className="w-11/12" id="event-duration-input" placeholder='Duration of the event'></Input>
                <Input className="w-11/12" id="event-description-input" placeholder='Description of the event'></Input>
                <Input className="w-11/12" id="event-image-input" placeholder='Image of the event'></Input>

                <Container className="w-11/12">
                    <Label className="text-[#050968]" htmlFor="Location">Location</Label>
                    <Input className="w-11/12" id="event-latitude-input" placeholder='Latitude'></Input>
                    <Input className="w-11/12" id="event-longitude-input" placeholder='Longitude'></Input>
                </Container>

                <Container className="flex justify-center gap-2rem">
                    <Button className="h-7 bg-[#050968] w-32">Create</Button>
                    <Button className="h-7 bg-[#050968] w-32" onClick={handleCancelCreateEventClick}>Cancel</Button>
                </Container>

            </Container>

        </Form >
    </section >
}