import logic from '../../logic/index.js'

import { useState } from 'react'
import { BiLike } from "react-icons/bi"
import { BiSolidLike } from "react-icons/bi"
import { BsTrash3 } from "react-icons/bs"
import { GoStarFill } from "react-icons/go"
import { FiStar } from "react-icons/fi"

import Container from '../library/Container.jsx'
import Image from '../library/Image.jsx'
import Paragraph from '../library/Paragraph.jsx'
import Link from '../library/Link.jsx'
import Button from '../library/Button.jsx'

import Confirm from '../common/Confirm.jsx'

export default function Event({ event, onEventDeleted, onEventLikeToggled, onEventAttendanceToggled }) {
    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeleteEventClick = () => setConfirmMessage('Delete event?')

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

    const handleLikeEventClick = () => {
        try {
            logic.toggleLikeEvents(event.id)
                .then(() => onEventLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.confirmMessage)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAttendanceEventClick = () => {
        try {
            logic.toggleAttendanceEvent(event.id)
                .then(() => onEventAttendanceToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="border-[#050968] p-4 rounded-[80px] bg-[#FFEBF4] m-4 max-w-md border-4 font-bold">
        <Container className="items-center justify-between">
            <Container className="items-center justify-between">
                <Image src={event.image} alt={event.title} className="h-24 w-24 rounded-full mr-4" />

                <Paragraph className="text-[#050968] font-semibold">{event.date}</Paragraph>

                <Link className="text-[#9747FF] font-semibold">+ Info</Link>
            </Container>

            <Container className="flex justify-between absolute">
                <Button onClick={handleAttendanceEventClick}>{(event.attendee ? <GoStarFill color="blue" /> : <FiStar color="blue" />) + ' ' + event.attendees.length + ' attendee' + (event.attendees.length === 1 ? '' : 's')}</Button>

                <Button onClick={handleLikeEventClick}>{event.like ? <BiSolidLike color="blue" /> : <BiLike color="blue" />}</Button>

                {event.author.id === logic.getUserId() && <>
                    <Button onClick={handleDeleteEventClick}><BsTrash3 color="blue" />
                    </Button>
                    {/* <Button onClick={handleEditEventClick}></Button> */}
                </>}


                {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel} />}

            </Container>

        </Container>

    </article>
}

