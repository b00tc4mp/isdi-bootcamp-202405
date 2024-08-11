import { useState } from 'react'

import CreatePost from './CreatePost'

import Button from '../library/Button'

export default function Footer({ onPostCreated }) {
    const [createPostVisible, setCreatePostVisible] = useState(false)

    const handleCreatePostClick = () => setCreatePostVisible(true)

    const handleCancelCreatePostClick = () => setCreatePostVisible(false)

    const handlePostCreated = () => {
        setCreatePostVisible(false)

        onPostCreated()
    }

    return <footer>
        <Button onClick={handleCreatePostClick}>+</Button>

        {createPostVisible && <CreatePost
            onPostCreated={handlePostCreated}
            onCancelCreatePost={handleCancelCreatePostClick} />}
    </footer>
}