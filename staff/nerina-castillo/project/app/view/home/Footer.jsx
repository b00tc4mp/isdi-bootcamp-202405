import { useState } from 'react'

import CreatePost from './CreatePost'

import Button from '../library/Button'
import CreateEvent from './CreateEvent'

export default function Footer({ onPostCreated, onEventCreated, location }) {
    const [createVisible, setCreateVisible] = useState(false)

    const handleCreateClick = () => setCreateVisible(true)

    const handleCancelCreateClick = () => setCreateVisible(false)

    const handleEventCreated = () => {
        setCreateVisible(false)

        onEventCreated()
    }

    const handlePostCreated = () => {
        setCreateVisible(false)

        onPostCreated()
    }

    return <footer>
        <Button onClick={handleCreateClick}>+</Button>

        {createVisible && location === '/calendar' && (
            <CreateEvent
                onEventCreated={handleEventCreated}
                onCancelCreateEvent={handleCancelCreateClick}
            />
        )}

        {createVisible && location !== '/calendar' && (
            <CreatePost
                onPostCreated={handlePostCreated}
                onCancelCreatePost={handleCancelCreateClick}
            />
        )}
    </footer>
}