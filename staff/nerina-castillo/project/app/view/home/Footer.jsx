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

    return <footer className='fixed start-0 bottom-0 w-full flex justify-around box-border py-2 px-0 z-10 bg-slate-800 text-slate-300 border-t border-slate-300'>
        <Button onClick={handleBandsClick}>bands</Button>
        <Button onClick={handleLabelsClick}>labels</Button>
        <Button onClick={handleCreateClick}>+</Button>
        <Button onClick={handlePromotersClick}>promo</Button>
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