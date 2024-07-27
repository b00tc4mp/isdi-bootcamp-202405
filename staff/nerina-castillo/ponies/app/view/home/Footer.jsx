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
        console.debug('Footer -> handleCancelCreatePostClick')

        setCreatePostVisible(false)
    }


    const handlePostCreated = () => {
        setCreatePostVisible(false)

        onPostCreated()
    }


    return <footer className="Footer">
        <Button className="Button--add" onClick={handleCreatePostClick}>+</Button>

        {createPostVisible && <CreatePost
            onPostCreated={handlePostCreated}
            onCancelCreatePost={handleCancelCreatePostClick} />}

    </footer>

}



export default Footer