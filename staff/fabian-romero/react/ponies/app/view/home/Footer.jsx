import { useState } from 'react'

import CreatePost from './CreatePost'

import Button from '../library/Button'

import './Footer.css'

export default function Footer({ onPostCreated }) {
    console.debug('Footer -> call')

    const [createPostVisible, setCreatePostVisible] = useState(false)

    const handleCreatePostClick = () => {
        console.debug('Footer -> handleCreatePostClick')

        setCreatePostVisible(true)
    }

    const handleCancelCreatePostClick = () => {
        console.debug('Footer -> handleCancelCreatePostClick')

        setCreatePostVisible(false)
    }

    const handlePostCreated = () => {
        setCreatePostVisible(false)

        onPostCreated()
    }

    return <footer className="fixed bottom-0 left-0 w-full flex justify-center bg-white dark:bg-black p-[.5rem_0] shadow-[0px_-1px_1px_lightgray]">
        <Button onClick={handleCreatePostClick}>＋</Button>

        {createPostVisible && <CreatePost onPostCreated={handlePostCreated} onCancelCreatePost={handleCancelCreatePostClick} />}
    </footer>
}