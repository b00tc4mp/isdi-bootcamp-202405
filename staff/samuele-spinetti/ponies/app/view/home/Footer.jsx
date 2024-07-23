import { useState } from 'react'

import CreatePost from './CreatePost'
import Button from '../components/Button'
import Image from '../components/Image'

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

        <Button className={"add-post-button"} onClick={handleCreatePostClick}>
            <Image className={"add-post-button__icon"} src={"https://svgsilh.com/svg/1721865.svg"} />
        </Button>

        <Button className={"chat-button"}>
            <Image className={"chat-button__icon"} src={"https://svgsilh.com/svg/1294839.svg"} />
        </Button>

        {createPostVisible &&
            <CreatePost
                onPostCreated={handlePostCreated}
                onCancelCreatePost={handleCancelCreatePostClick} />}
    </footer >
}

export default Footer
