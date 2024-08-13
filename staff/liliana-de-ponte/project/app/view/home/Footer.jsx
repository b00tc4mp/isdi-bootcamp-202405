import { useState } from 'react'

import CreateEvent from './CreateEvent'
import Button from '../library/Button'

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

        <Button onClick={handleCreateEventClick}>+</Button>

        {createEventVisible && <CreateEvent onEventreated={handleEventCreated} onCalcelCreateEvent={handleCancelCreateEventClick} />}
    </footer>
}