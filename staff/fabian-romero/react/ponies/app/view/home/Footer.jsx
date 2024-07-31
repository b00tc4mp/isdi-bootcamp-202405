import { useState } from 'react'

import CreatePost from './CreatePost'

import './Footer.css'

const Footer = ({ onPostCreated }) => {
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
    return <footer className="Footer">
        <button className="Button" onClick={handleCreatePostClick}>＋</button>

        {createPostVisible && <CreatePost onPostCreated={handlePostCreated} onCancelCreatePost={handleCancelCreatePostClick} />}
    </footer>
}

export default Footer
