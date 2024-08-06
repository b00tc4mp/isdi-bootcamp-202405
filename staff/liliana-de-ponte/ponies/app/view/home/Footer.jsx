import { useState } from 'react'

import CreatePost from './CreatePost'

import Button from '../components/Button'

import './Footer.css'

const Footer = ({ onPostCreated }) => {
    console.debug('Footer -> call')

    const [createPostVisible, setCreatePostVisible] = useState(false)

    const handleCreatePostClick = () => {
        console.debug('Footer -> handleCreatePostClick')

        setCreatePostVisible(true)

    }

    const handleCancelCreatePostClick = () => {
        console.debug('Footer -> handleCancetCreatePostClick')

        setCreatePostVisible(false)
    }

    const handlePostCreated = () => {
        console.debug('Footer -> handlePostCreated')

        setCreatePostVisible(false)

        onPostCreated()
    }

    return <footer className="fixed bottom-0 left-0 w-full flex justify-center bg-[#F981FB] p-[0.5rem_0]">
        <Button className="Footer--create-post" onClick={handleCreatePostClick}>+</Button>

        {createPostVisible && <CreatePost onPostCreated={handlePostCreated} onCancelCreatePost={handleCancelCreatePostClick} />}
    </footer >
}

export default Footer
