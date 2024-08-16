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
        const eventLatitudeInput = form['event-latitude-input']
        const eventLongitudeInput = form['event-longitude-input']
        const eventStartDateInput = form['event-start-date-input']
        const eventEndDateInput = form['event-end-date-input']

        const eventImage = eventImageInput.value
        const eventDescription = eventDescriptionInput.value
        const eventLatitude = parseFloat(eventLatitudeInput.value.trim())
        const eventLongitude = parseFloat(eventLongitudeInput.value.trim())
        const eventStartDate = new Date(eventStartDateInput.value)
        const eventEndDate = new Date(eventEndDateInput.value)

        if (isNaN(eventLatitude) || isNaN(eventLongitude)) {
            console.error('invalid longitude and latitude')
            return
        }

        try {
            logic.createEvent(eventImage, eventDescription, eventLongitude, eventLatitude, eventStartDate, eventEndDate)
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
                <Input id='event-latitude-input' />
                <Input id='event-longitude-input' />
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