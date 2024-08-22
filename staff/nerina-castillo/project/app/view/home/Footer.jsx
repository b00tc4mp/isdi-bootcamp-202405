import { useState } from 'react'
import CreatePost from './CreatePost'
import Button from '../library/Button'
import CreateEvent from './CreateEvent'
import Image from '../library/Image'

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
        <Button onClick={handleBandsClick}>
            <Image src='./band.png' className="w-[30px] h-[30px]" />
        </Button>
        <Button onClick={handleLabelsClick}>
            <Image src='./record-label.png' className="w-[30px] h-[30px]" />
        </Button>
        <Button onClick={handleCreateClick}>
            <Image src='./create.png' className="w-[30px] h-[30px]" />
        </Button>
        <Button onClick={handlePromotersClick}>
            <Image src='./distribution.png' className="w-[30px] h-[30px]" />
        </Button>
        <Button onClick={handleVenuesClick}>
            <Image src='./venue.png' className="w-[30px] h-[30px]" />
        </Button>

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