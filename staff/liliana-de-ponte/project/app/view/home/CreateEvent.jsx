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
        const eventAddressInput = form['event-address-input']
        const eventCityInput = form['event-city-input']
        const eventLatitudeInput = form['event-latitude-input']
        const eventLongitudeInput = form['event-longitude-input']

        const eventTitle = eventTitleInput.value
        const eventOrganizer = eventOrganizerInput.value
        const eventDate = new Date(eventDateInput.value)
        const eventDuration = eventDurationInput.value
        const eventDescription = eventDescriptionInput.value
        const eventImage = eventImageInput.value
        const eventAddress = eventAddressInput.value
        const eventCity = eventCityInput.value
        const eventLatitude = parseFloat(eventLatitudeInput.value.trim())
        const eventLongitude = parseFloat(eventLongitudeInput.value.trim())

        const location = {
            type: 'Point',
            coordinates: [eventLatitude, eventLongitude]
        }

        try {
            logic.createEvent(eventTitle, eventOrganizer, eventDate, eventDuration, eventDescription, eventImage, location, eventAddress, eventCity)
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

    return <section className="bg-[#FFEBF4] shadow-[1px_1px_10px_1px] shadow-[#050968]">
        <Container className="gap-2 flex justify-center mt-1">
            <Heading className="text-[#050968] font-bold">Create Event</Heading>
        </Container>

        < Form className="flex-col min-w-[80%]" onSubmit={handleCreateEventSubmit} >
            <Container className="flex-col items-center gap-2.5 mt-4">
                <Input className="w-11/12 p-1" id="event-title-input" placeholder='Event Title'></Input>
                <Input className="w-11/12 p-1" id="event-organizer-input" placeholder='Organizer Name'></Input>

                <Container className="w-11/12">
                    <Label className="text-[#050968] p-1" htmlFor="date-select" >Date of the event </Label>
                    <Input className="p-1" id="event-date-input" type="date"></Input>
                </ Container>

                <Input className="w-11/12 p-1" id="event-duration-input" placeholder='Duration of the event'></Input>
                <Input className="w-11/12 p-1" id="event-description-input" placeholder='Description of the event'></Input>
                <Input className="w-11/12 p-1" id="event-image-input" placeholder='Image of the event'></Input>
                <Input className="w-11/12 p-1" id="event-address-input" placeholder='Address of the event'></Input>
                <Input className="w-11/12 p-1" id="event-city-input" placeholder='City of the event'></Input>

                <Container className="w-11/12">
                    <Label className="text-[#050968] p-1" htmlFor="Location">Location</Label>
                    <Input className="w-11/12 p-1" id="event-latitude-input" placeholder='Latitude'></Input>
                    <Input className="w-11/12 p-1" id="event-longitude-input" placeholder='Longitude'></Input>
                </Container>

                <Container className="flex justify-between gap-2 mb-5 mt-3">
                    <Button className="h-6.5 bg-[#050968] w-32">Create</Button>
                    <Button className="h-6.5 bg-[#050968] w-32" onClick={handleCancelCreateEventClick}>Cancel</Button>
                </Container>

            </Container>

        </Form >
    </section >
}