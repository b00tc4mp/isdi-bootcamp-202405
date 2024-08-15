import { useState } from 'react'

import logic from '../../logic'
import formatTime from '../../util/formatTime.js'

import Button from '../library/Button'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Confirm from '../common/Confirm'
import Input from '../library/Input'
import Label from '../library/Label'
import Form from '../library/Form'

export default function Event({ event, onEventDeleted, onEventEdited }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [editEventVisible, setEditEventVisible] = useState(false)

    const handleDeleteEventClick = () => setConfirmMessage('delete event?')

    const handleDeleteEventAccept = () => {
        try {
            logic.deleteEvent(event.id)
                .then(() => onEventDeleted())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteEventCancel = () => setConfirmMessage(null)

    const handleEditEventClick = () => setEditEventVisible(true)

    const handleCancelEditEventClick = () => setEditEventVisible(false)

    const handleEditEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editImageInput = form['edit-image-input']
        const editDescriptionInput = form['edit-description-input']
        const editLocationInput = form['edit-location-input']
        const editStartDateInput = form['edit-start-date-input']
        const editEndDateInput = form['edit-end-date-input']

        const newImage = editImageInput.value
        const newDescription = editDescriptionInput.value
        const newLocation = editLocationInput.value
        const newStartDate = editStartDateInput.value
        const newEndDate = editEndDateInput.value

        try {
            logic.updateEventData(event.id, { newImage, newDescription, newLocation, newStartDate, newEndDate })
                .then(() => {
                    setEditEventVisible(false)

                    onEventEdited()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article>
        <Container>
            {event.image && (
                <Image src={event.image} title={event.description} alt='event image' />
            )}

            <Heading level='4'>{event.description}</Heading>

            <Paragraph>location: {event.location.coordinates.join(', ')}</Paragraph>
            <Paragraph>starts: {formatTime(new Date(event.startDate))}</Paragraph>
            <Paragraph>ends: {formatTime(new Date(event.endDate))}</Paragraph>

            <Time>{formatTime(new Date(event.date))}</Time>

            <Heading level='6'>{event.author.username}</Heading>

            <Container>
                {event.author.id === logic.getUserId() && <>
                    <Button onClick={handleDeleteEventClick}>DELETE</Button>
                    <Button onClick={handleEditEventClick}>EDIT</Button>
                </>}
            </Container>

            {editEventVisible && <Form onSubmit={handleEditEventSubmit}>
                <Label htmlFor='edit-image-input'>image</Label>
                <Input id='edit-image-input' defaultValue={event.image} />
                <Label htmlFor='edit-description-input'>description</Label>
                <Input id='edit-description-input' defaultValue={event.description} />
                <Label htmlFor='edit-location-input'>location</Label>
                <Input id='edit-location-input' defaultValue={event.location} />
                <Label htmlFor='edit-start-date-input'>start date</Label>
                <Input id='edit-start-date-input' defaultValue={event.startDate} />
                <Label htmlFor='edit-end-date-input'>end date</Label>
                <Input id='edit-end-date-input' defaultValue={event.endDate} />

                <Button type='submit'>save</Button>
                <Button type='reset' onClick={handleCancelEditEventClick}>cancel</Button>
            </Form>}

            {confirmMessage && (<Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel}></Confirm>)}
        </Container>
    </article>
}
