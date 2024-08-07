import { useState } from 'react'

import CreatePost from "./CreatePost"

import Button from "../../components/Button"

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

    return <footer className="fixed bottom-0 left-0 w-full flex justify-center bg-white p-[.5rem_0] shadow-[0px_-1px_1px_lightgray] bg-gradient-to-r from-violet-500 to-fuchsia-500 min-h-[8%]">
        <Button className="font-bold border-black border-2 decoration-black rounded-[5px] w-[50px] h-[3]px fixed bottom-[5px] m-[5px] bg-blue-300" onClick={handleCreatePostClick}>＋</Button>

        {createPostVisible && <CreatePost onPostCreated={handlePostCreated} onCancelCreatePost={handleCancelCreatePostClick} />}
    </footer>
}