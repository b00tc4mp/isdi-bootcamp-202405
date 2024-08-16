import { useState } from 'react'

import CreatePost from './CreatePost'

import Button from '../library/Button'
import CreateEvent from './CreateEvent'

export default function Footer({ onPostCreated, onEventCreated, location, onBandsClick, onLabelsClick, onPromotersClick, onVenuesClick }) {
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

    const handleBandsClick = () => onBandsClick()

    const handleLabelsClick = () => onLabelsClick()

    const handlePromotersClick = () => onPromotersClick()

    const handleVenuesClick = () => onVenuesClick()

    return <footer>
        <Button onClick={handleBandsClick}>bands</Button>
        <Button onClick={handleLabelsClick}>labels</Button>
        <Button onClick={handleCreateClick}>+</Button>
        <Button onClick={handlePromotersClick}>promoters</Button>
        <Button onClick={handleVenuesClick}>venues</Button>

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