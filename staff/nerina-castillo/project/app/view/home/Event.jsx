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

export default function Event({ event, onEventDeleted }) {
    const [confirmMessage, setConfirmMessage] = useState(null)

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
                {event.author.id === logic.getUserId() && (
                    <Button onClick={handleDeleteEventClick}>DELETE</Button>
                )}
            </Container>

            {confirmMessage && (<Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel}></Confirm>)}
        </Container>
    </article>
}
