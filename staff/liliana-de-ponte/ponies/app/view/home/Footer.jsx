import { useState } from 'react'

import CreatePost from './CreatePost'

import Button from '../library/Button'

export default function Footer({ onPostCreated }) {
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

    return <footer className="fixed bottom-0 left-0 w-full flex justify-center bg-[#F981FB] dark:bg-pink-950 p-[0.5rem_0] shadow-[0px_-1px_1px_ligthgray]">
        <Button className="bg-[#F981FB]  dark:bg-pink-950 font-serif h-[30px] rounded-[8px] border-[f7bff8]" onClick={handleCreatePostClick}>+</Button>

        {createPostVisible && <CreatePost onPostCreated={handlePostCreated} onCancelCreatePost={handleCancelCreatePostClick} />}
    </footer >
}
