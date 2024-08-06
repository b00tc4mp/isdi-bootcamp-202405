import { useState } from 'react'

import CreatePost from './CreatePost'

import Button from '../components/Button'


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


    return <footer className="fixed bottom-0 start-0 w-full flex justify-center bg-[white] py-2 px-0 shadow-[0_4px_8px_rgba(0,0,0,0.2)] z-10">
        <Button className=" bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[5px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)]  " onClick={handleCreatePostClick}>+</Button>

        {createPostVisible && <CreatePost
            onPostCreated={handlePostCreated}
            onCancelCreatePost={handleCancelCreatePostClick} />}

    </footer>

}



export default Footer