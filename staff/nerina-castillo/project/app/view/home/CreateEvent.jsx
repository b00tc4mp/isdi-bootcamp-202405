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

    return <section className='fixed bottom-0 top-0 w-full bg-slate-300  text-slate-900 border'>
        <Heading className='ml-2 text-xl font-bold'>create event</Heading>

        <Form onSubmit={handleCreateEventSubmit}>

            <Container className='flex flex-col'>
                <Label htmlFor='event-image-input'>image</Label>
                <Input id='event-image-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col'>
                <Label htmlFor='event-title-input'>title</Label>
                <Input id='event-title-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col'>
                <Label htmlFor='event-description-input'>description</Label>
                <Input id='event-description-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col gap-2'>
                <Label htmlFor='event-location-input'>location</Label>
                <Input id='event-latitude-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                <Input id='event-longitude-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col'>
                <Label htmlFor='event-start-date-input'>date</Label>
                <Input id='event-start-date-input' type='date' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col'>
                <Label htmlFor='event-start-time-input'>time</Label>
                <Input id='event-start-time-input' type='time' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col'>
                <Label htmlFor='event- tickets-input'>tickets</Label>
                <Input id='event-tickets-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col'>
                <Button type='submit' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold'>create</Button>
                <Button type='button' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold mb-2' onClick={handleCancelCreateEventClick}>cancel</Button>
            </Container>
        </Form>
    </section>
}