import logic from '../../logic/index.js'
import formatTime from '../../utils/formatTime.js'

import { useState } from 'react'
import { BiLike } from "react-icons/bi"
import { BiSolidLike } from "react-icons/bi"
import { BsTrash3 } from "react-icons/bs"
import { GoStarFill } from "react-icons/go"
import { FiStar } from "react-icons/fi"
import { FaCalendarAlt } from "react-icons/fa"

import Container from '../library/Container.jsx'
import Image from '../library/Image.jsx'
import Paragraph from '../library/Paragraph.jsx'
import Link from '../library/Link.jsx'
import Button from '../library/Button.jsx'
import Heading from '../library/Heading.jsx'

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

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#050968] rounded-[5px] bg-[#FFEBF4] p-2 m-2 font-bold relative">
        <Container className="items-start relative">

            <Link className="absolute right-2 text-[#050968] text-xs flex items-center mr-0 mt-0" href={`/info/${event.id}`}><u>+Info</u></Link>

            <Container className="flex-shrink-0">
                <Image src={event.image} alt={event.title} title={event.title} className="h-24 w-24 rounded-xl mr-2 border-2 shadow-[1px_1px_10px_1px] shadow-[#050968]" />
            </Container>

            <Container className="flex flex-col justify-start items-start w-full ml-2 mt-4">

                <Heading level="5" className="text-[#050968] text-sm font-semibold mb-1 mt-[-4px] mr-6" >{event.title}</Heading>

                <Paragraph className="text-[#050968] text-[10px] font-semibold flex items-center mb-2 ml-4"><FaCalendarAlt />{formatTime(new Date(event.date))}</Paragraph>
            </Container>

            <Button className="text-[#9747FF] mt-6 text-sm" onClick={handleAttendanceEventClick}>{event.attendance ? <GoStarFill color="9747FF" size={20} /> : <FiStar color="9747FF" size={20} />}<span style={{ color: '#9747FF' }}>{' '}{event.attendees.length}</span></Button>

            <Container className="absolute bottom-0 right-0 flex items-end space-x-3">

                {event.author.id === logic.getUserId() && <>

                    <Button className="mb-0 right-8 flex items-center" onClick={handleDeleteEventClick}><BsTrash3 color="050968" size={16} />
                    </Button>

                    <Button className="mb-0" onClick={handleLikeEventClick}>{event.like ? <BiSolidLike color="9747FF" size={20} /> : <BiLike color="9747FF" size={20} />}</Button>

                </>}

                {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteEventAccept} onCancel={handleDeleteEventCancel} />}

            </Container>
        </Container>

    </article >
}

