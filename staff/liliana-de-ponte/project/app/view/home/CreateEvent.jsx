import logic from '../../logic/index.js'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'


export default function CreateEvent({ onPostCreated, onCancelCreateEvent }) {

    const handleCreateEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const eventTitleInput = form['event-title-input']
        const eventOrganizerInput = form['event-organizer-input']
        const eventDateInput = form['event-date-input']
        //este deberia ser dar click y calendario

        const eventDurationInput = form['event-duration-input']
        const eventDescriptionInput = form['event-description-input']
        const eventImageInput = form['event-image-input']

        const eventTitle = eventTitleInput.value
        const eventOrganizer = eventOrganizerInput.value
        const eventDate = eventDateInput.value
        const eventDuration = eventDurationInput.value
        const eventDescription = eventDescriptionInput.value
        const eventImage = eventImageInput.value

        try {
            logic.createEvent(eventTitle, eventOrganizer, eventDate, eventDuration, eventDescription, eventImage)
                .then(() => onPostCreated())
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
        <Heading>New Event</Heading>

        <Form onSubmit={handleCreateEventSubmit}>
            <Container>
                <Input placeholder='Event Title'></Input>
                <Input placeholder='Organizer Name'></Input>
                <Input placeholder='Event Date'></Input>
                <Input placeholder='Duration of the event'></Input>
                <Input placeholder='Description of the event'></Input>
                <Input placeholder='Image of the event'></Input>

                <Container>
                    <Button>Create</Button>
                    <Button onClick={handleCancelCreateEventClick}>Cancel</Button>
                </Container>

            </Container>

        </Form>
    </section>
}