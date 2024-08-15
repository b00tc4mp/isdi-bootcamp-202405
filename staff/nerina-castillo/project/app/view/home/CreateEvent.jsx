import logic from '../../logic/index.js'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'

export default function CreateEvent({ onEventCreated, onCancelCreateEvent }) {
    const handleCreateEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const eventImageInput = form['event-image-input']
        const eventDescriptionInput = form['event-description-input']
        const eventLocationInput = form['event-location-input']
        const eventStartDateInput = form['event-start-date-input']
        const eventEndtDateInput = form['event-end-date-input']

        const eventImage = eventImageInput.value
        const eventDescription = eventDescriptionInput.value
        const eventLocation = eventLocationInput.value
        const eventStartDate = eventStartDateInput.value
        const eventEndtDate = eventEndtDateInput.value

        try {
            logic.createEvent(eventImage, eventDescription, eventLocation, eventStartDate, eventEndtDate)
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

    const handleCancelCreateEventClick = () => onCancelCreateEvent()

    return <section>
        <Heading level='4'>create event</Heading>

        <Form onSubmit={handleCreateEventSubmit}>
            <Container>
                <Label htmlFor='event-image-input'>image</Label>
                <Input id='event-image-input' />
            </Container>
            <Container>
                <Label htmlFor='event-description-input'>description</Label>
                <Input id='event-description-input' />
            </Container>
            <Container>
                <Label htmlFor='event-location-input'>location</Label>
                <Input id='event-location-input' />
            </Container>
            <Container>
                <Label htmlFor='event-start-date-input'>start date</Label>
                <Input id='event-start-date-input' type='date' />
            </Container>
            <Container>
                <Label htmlFor='event-end-date-input'>end date</Label>
                <Input id='event-end-date-input' type='date' />
            </Container>
            <Container>
                <Button type='submit'>create</Button>
                <Button type='button' onClick={handleCancelCreateEventClick}>cancel</Button>
            </Container>
        </Form>
    </section>
}