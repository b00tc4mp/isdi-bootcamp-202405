import { useState } from 'react'
import { FaRegSquarePlus } from "react-icons/fa6"
import { BiLike } from 'react-icons/bi'
import { FiStar } from 'react-icons/fi'

import CreateEvent from './CreateEvent'
import Button from '../library/Button'
import Container from '../library/Container'

export default function Footer({ onEventCreated }) {

    const [createEventVisible, setCreateEventVisible] = useState(false)

    const handleCreateEventClick = () => {
        setCreateEventVisible(true)
    }

    const handleCancelCreateEventClick = () => {
        setCreateEventVisible(false)

    }

    const handleEventCreated = () => {
        setCreateEventVisible(false)

        onEventCreated()
    }

    return <footer className="fixed bottom-0 left-0 w-full flex justify-center bg-[#050968]">

        <Container className="flex justify-between items-center mx-auto max-w-md p-2">
            <Button><FiStar size={22} /></Button>
            <Button onClick={handleCreateEventClick}><FaRegSquarePlus size={22} /></Button>
            <Button><BiLike size={22} /></Button>
        </Container>

        {createEventVisible && <CreateEvent onEventCreated={handleEventCreated} onCalcelCreateEvent={handleCancelCreateEventClick} />}
    </footer>
}