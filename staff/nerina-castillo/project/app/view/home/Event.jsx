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

export default function Event({ event: currentEvent, onEventDeleted }) {
    const [confirmMessage, setConfirmMessage] = useState(null)

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
                </>}
            </Container>

            {confirmMessage && (<Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel}></Confirm>)}
        </Container>
    </article >

}
