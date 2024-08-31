import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import formatTime from '../../utils/formatTime.js'

import { FaCalendarAlt } from "react-icons/fa"
import { LuClock } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import logic from "../../logic"

import Container from "../library/Container.jsx"
import Image from '../library/Image.jsx'
import Paragraph from '../library/Paragraph.jsx'

export default function MoreInfoEvent() {
    const { eventId } = useParams()
    const [event, setEvent] = useState(null)

    useEffect(() => {
        try {
            logic.getEvent(eventId)
                .then(event => setEvent(event))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }, [eventId])


    return <article className="shadow-[1px_1px_10px_1px] shadow-[#050968] text-[#050968] rounded-[5px] bg-[#FFEBF4] p-4 m-4 mt-4">

        <Container className="w-full h-full flex flex-col space-y-4">
            <Paragraph className="flex font-bold justify-center text-lg">{event?.title}</Paragraph>

            <Image src={event?.image} alt={event?.title} title={event?.title} className="h-30 w-30 rounded-xl mr-2 border-2 shadow-[1px_1px_10px_1px] shadow-[#050968]" />

            <Paragraph className="flex text-[#9747FF] font-bold justify-center text-sm"><FaCalendarAlt />{formatTime(new Date(event?.date))}</Paragraph>

            <Paragraph className="flex justify-center text-sm">{event?.description}</Paragraph>

            <Paragraph className="flex font-bold text-[#9747FF] text-sm"><LuClock size={14} />{event?.duration}</Paragraph>

            <Paragraph className="flex font-bold text-[#9747FF] text-sm"><IoLocationSharp size={14} />{event?.address}, {event?.city}</Paragraph>

        </Container>

    </article>

}