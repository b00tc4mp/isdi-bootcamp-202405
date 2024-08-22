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
import formatDate from '../../util/formatDate.js'

export default function Event({ event: currentEvent, onEventDeleted, onEventEdited, onBack }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [editEventVisible, setEditEventVisible] = useState(false)

    const handleDeleteEventClick = () => setConfirmMessage('delete event?')

    const handleDeleteEventAccept = () => {
        try {
            logic.deleteEvent(currentEvent.id)
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

    const handleEditEventSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const editImageInput = form['edit-image-input']
        const editDescriptionInput = form['edit-description-input']
        const editLatitudeInput = form['edit-latitude-input']
        const editLongitudeInput = form['edit-longitude-input']
        const editStartDateInput = form['edit-start-date-input']
        const editEndDateInput = form['edit-end-date-input']

        const image = editImageInput.value
        const description = editDescriptionInput.value
        const latitude = editLatitudeInput.value
        const longitude = editLongitudeInput.value
        const startDate = editStartDateInput.value
        const endDate = editEndDateInput.value

        try {
            logic.updateEventData(currentEvent.id, { image, description, latitude, longitude, startDate, endDate })
                .then(() => {
                    setEditEventVisible(false)
                    onEventEdited()
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                });
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <article className='border-b border--b border-gray-500 ml-2 mr-2 mb-10'>
        <Container>
            {currentEvent.image && (
                <Image src={currentEvent.image} title={currentEvent.title} alt='event image' />
            )}
            <Heading className='mb-2 mt-2 font-bold text-lg'>{currentEvent.title}</Heading>
            <Paragraph>{currentEvent.description}</Paragraph>
            <Paragraph>
                <span className='font-bold text-slate-400'>location: </span>
                <span>{currentEvent.location.coordinates.join(', ')}</span>
            </Paragraph>
            <Paragraph>
                <span className='font-bold text-slate-400'>date: </span>
                <span>{formatDate(new Date(currentEvent.startDate))}</span>
            </Paragraph>
            <Paragraph>
                <span className='font-bold text-slate-400'>time: </span>
                <span>{currentEvent.startTime}</span>
            </Paragraph>
            <Paragraph>
                <span className='font-bold text-slate-400'>tickets: </span>
                <span>{currentEvent.tickets}</span>
            </Paragraph>
            <Heading className='text-xs text-slate-500'>{currentEvent.author.username}</Heading>
            <Time>{formatTime(new Date(currentEvent.date))}</Time>

            <Container>
                {currentEvent.author.id === logic.getUserId() && <>
                    <Button className='left-0' onClick={handleDeleteEventClick}>
                        <Image src='./delete.png' className='w-[20px] h-[20px]' />

                    </Button>
                    {/* <Button onClick={handleEditEventClick}>EDIT</Button> */}
                </>}
            </Container>


            {editEventVisible && <Form onSubmit={handleEditEventSubmit}>
                <Label htmlFor='edit-image-input'>image</Label>
                <Input id='edit-image-input' defaultValue={currentEvent.image} />
                <Label htmlFor='edit-description-input'>description</Label>
                <Input id='edit-description-input' defaultValue={currentEvent.description} />
                <Label htmlFor='edit-latitude-input'>latitude</Label>
                <Input id='edit-latitude-input' defaultValue={currentEvent.latitude} />
                <Label htmlFor='edit-longitude-input'>longitude</Label>
                <Input id='edit-longitude-input' defaultValue={currentEvent.longitude} />
                <Label htmlFor='edit-start-date-input'>start date</Label>
                <Input id='edit-start-date-input' defaultValue={currentEvent.startDate} />
                <Label htmlFor='edit-end-date-input'>end date</Label>
                <Input id='edit-end-date-input' defaultValue={currentEvent.endDate} />

                <Button type='submit'>save</Button>
                <Button type='reset' onClick={handleCancelEditEventClick}>cancel</Button>
            </Form>}

            {confirmMessage && (<Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel}></Confirm>)}
        </Container>
    </article >

}
