import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreatePost from './CreatePost'
import Button from '../library/Button'
import CreateEvent from './CreateEvent'
import Image from '../library/Image'

export default function Footer({ onPostCreated, onEventCreated, location }) {
    const [createVisible, setCreateVisible] = useState(false)
    const navigate = useNavigate()

    const handleCreateClick = () => setCreateVisible(true)

    const handleCancelCreateClick = () => setCreateVisible(false)

    const handleEventCreated = (newEvent) => {
        setCreateVisible(false)

        onEventCreated(newEvent)
        navigate()
    }

    const handlePostCreated = () => {
        setCreateVisible(false)

        onPostCreated()
    }

    return <footer className='fixed start-0 bottom-0 w-full flex justify-around box-border py-4 px-0 z-10 bg-slate-800 text-slate-300 border-t border-slate-300'>
        <Button onClick={handleCreateClick}>
            <Image src='./create.png' className='w-[30px] h-[30px]' />
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