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
import formatDate from '../../util/formatDate.js'
import Input from '../library/Input'
import Label from '../library/Label'
import Form from '../library/Form'

export default function Event({ event: currentEvent, onEventDeleted, onEventEdited }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [editEventVisible, setEditEventVisible] = useState(false)

    const handleEditEventClick = () => setEditEventVisible(true)

    const handleCancelEditEventClick = () => setEditEventVisible(false)

    const handleEditEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editImageInput = form['edit-image-input']
        const editTitleInput = form['edit-title-input']
        const editDescriptionInput = form['edit-description-input']
        const editLatitudeInput = form['edit-latitude-input']
        const editLongitudeInput = form['edit-longitude-input']
        const editStartDateInput = form['edit-start-date-input']
        const editStartTimeInput = form['edit-start-time-input']
        const editTicketsInput = form['edit-tickets-input']

        const editImage = editImageInput.value.trim()
        const editTitle = editTitleInput.value.trim()
        const editDescription = editDescriptionInput.value.trim()
        const editLatitude = parseFloat(editLatitudeInput.value.trim())
        const editLongitude = parseFloat(editLongitudeInput.value.trim())
        const editStartDate = editStartDateInput.value
        const editStartTime = editStartTimeInput.value
        const editTickets = editTicketsInput.value.trim()

        try {
            logic.updateEventData(currentEvent.id, editImage, editTitle, editDescription, editLongitude, editLatitude, editStartDate, editStartTime, editTickets)
                .then(() => {
                    setEditEventVisible(false)

                    onEventEdited(editStartDate)
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

    const handleDeleteEventClick = () => setConfirmMessage('delete event?')

    const handleDeleteEventAccept = () => {
        try {
            logic.deleteEvent(currentEvent.id)
                .then(() => {
                    onEventDeleted(currentEvent.id)
                    setConfirmMessage(null)
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

    const handleDeleteEventCancel = () => setConfirmMessage(null)

    return <article className='border-b border--b border-gray-500 ml-2 mr-2 mb-[60px]'>
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

            <Container className='flex items-center justify-between'>
                <Time>{formatTime(new Date(currentEvent.date))}</Time>

                {currentEvent.author.id === logic.getUserId() && <>
                    <Button className='left-0' onClick={handleDeleteEventClick}>
                        <Image src='./delete.png' className='w-[20px] h-[20px]' />
                    </Button>
                    <Button onClick={handleEditEventClick}>
                        <Image src='./edit.png' className='w-[20px] h-[20px]' />
                    </Button>
                </>}
            </Container>

            {editEventVisible && <Form className='bg-slate-300 text-slate-900 border rounded-xl' onSubmit={handleEditEventSubmit}>
                <Container className='flex flex-col space-y-4 p-4'>
                    <Container className='flex flex-col'>
                        <Label htmlFor='edit-image-input'>image</Label>
                        <Input id='edit-image-input' defaultValue={currentEvent.image} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                    </Container>
                    <Container className='flex flex-col'>
                        <Label htmlFor='edit-title-input'>title</Label>
                        <Input id='edit-title-input' defaultValue={currentEvent.title} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                    </Container>
                    <Container className='flex flex-col'>
                        <Label htmlFor='edit-description-input'>description</Label>
                        <Input id='edit-description-input' defaultValue={currentEvent.description} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                    </Container>
                    <Container className='flex flex-col gap-2'>
                        <Label htmlFor='edit-location-input'>location</Label>
                        <Input id='edit-latitude-input' defaultValue={currentEvent.location.coordinates[0]} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                        <Input id='edit-longitude-input' defaultValue={currentEvent.location.coordinates[1]} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                    </Container>
                    <Container className='flex flex-col'>
                        <Label htmlFor='edit-start-date-input'>date</Label>
                        <Input id='edit-start-date-input' type='date' defaultValue={currentEvent.startDate.slice(0, 10)} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                    </Container>
                    <Container className='flex flex-col'>
                        <Label htmlFor='edit-start-time-input'>time</Label>
                        <Input id='edit-start-time-input' type='time' defaultValue={currentEvent.startDate.slice(11, 16)} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                    </Container>
                    <Container className='flex flex-col'>
                        <Label htmlFor='edit-tickets-input'>tickets</Label>
                        <Input id='edit-tickets-input' defaultValue={currentEvent.tickets} className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
                    </Container>
                    <Container className='flex flex-col'>
                        <Button type='submit' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold'>SAVE</Button>
                        <Button type='button' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold' onClick={handleCancelEditEventClick}>CANCEL</Button>
                    </Container>
                </Container>
            </Form>}

            {confirmMessage && (<Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel}></Confirm>)}
        </Container>
    </article >

}
