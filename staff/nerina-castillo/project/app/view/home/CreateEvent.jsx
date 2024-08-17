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
        const eventTitleInput = form['event-title-input']
        const eventDescriptionInput = form['event-description-input']
        const eventLatitudeInput = form['event-latitude-input']
        const eventLongitudeInput = form['event-longitude-input']
        const eventStartDateInput = form['event-start-date-input']
        const eventStartTimeInput = form['event-start-time-input']
        const eventTicketsInput = form['event-tickets-input']

        const eventImage = eventImageInput.value
        const eventTitle = eventTitleInput.value
        const eventDescription = eventDescriptionInput.value
        const eventLatitude = parseFloat(eventLatitudeInput.value.trim())
        const eventLongitude = parseFloat(eventLongitudeInput.value.trim())
        const eventStartDate = new Date(eventStartDateInput.value)
        const eventStartTime = eventStartTimeInput.value
        const eventTickets = eventTicketsInput.value

        try {
            logic.createEvent(eventImage, eventTitle, eventDescription, eventLongitude, eventLatitude, eventStartDate, eventStartTime, eventTickets)
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
                <Label htmlFor='event-title-input'>title</Label>
                <Input id='event-title-input' />
            </Container>
            <Container>
                <Label htmlFor='event-description-input'>description</Label>
                <Input id='event-description-input' />
            </Container>
            <Container>
                <Label htmlFor='event-location-input'>location</Label>
                <Input id='event-latitude-input' />
                <Input id='event-longitude-input' />
            </Container>
            <Container>
                <Label htmlFor='event-start-date-input'>date</Label>
                <Input id='event-start-date-input' type='date' />
            </Container>
            <Container>
                <Label htmlFor='event-start-time-input'>time</Label>
                <Input id='event-start-time-input' type='time' />
            </Container>
            <Container>
                <Label htmlFor='event- tickets-input'>tickets</Label>
                <Input id='event-tickets-input' />
            </Container>
            <Container>
                <Button type='submit'>create</Button>
                <Button type='button' onClick={handleCancelCreateEventClick}>cancel</Button>
            </Container>
        </Form>
    </section>
}