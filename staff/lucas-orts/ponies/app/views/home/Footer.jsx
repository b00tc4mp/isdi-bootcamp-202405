import { useState } from 'react'

import CreatePost from "./CreatePost"
import Button from "../components/Button"

import './Footer.css'
const Footer = ({ onPostCreated }) => {
    const [createPostVisible, setCreatePostVisible] = useState(false)

    const handleCreatePostClick = () => {
        setCreatePostVisible(true)
    }

    const handleCancelCreatePostClick = () => {
        setCreatePostVisible(false)
    }

    const handlePostCreated = () => {
        setCreatePostVisible(false)

        onPostCreated()
    }
    return <footer className="footer">
        <Button onClick={handleCreatePostClick}>+</Button>

        {createPostVisible && <CreatePost onPostCreated={handlePostCreated} onCancelCreatePost={handleCancelCreatePostClick} />}

    </footer>
}

export default Footer