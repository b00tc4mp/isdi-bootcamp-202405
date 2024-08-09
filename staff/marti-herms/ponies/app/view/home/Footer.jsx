import AddPostSection from './AddPostSection'
import Button from '../library/Button'

import { useState } from 'react'

export default function Footer({ onHomeButtonClick, onPostSearch, onFollowedButtonClick, onSavedPostsButtonClick, onAddPostButton }) {
    const [activeButton, setActiveButton] = useState('home')

    const handleHomeButton = () => {
        setActiveButton('home')

        onHomeButtonClick()
    }

    const handleFollowedPostsButton = () => {
        setActiveButton('followed')

        onFollowedButtonClick()
    }

    const handleSavedPostsButton = () => {
        setActiveButton('saved')

        onSavedPostsButtonClick()
    }

    const handlePostSearchButton = () => {
        setActiveButton('search')

        onPostSearch()
    }

    return <footer className='fixed bottom-0 left-0 w-screen flex justify-around bg-custom-1 py-2 px-0 shadow shadow-black z-10'>
        <Button className={activeButton === 'home' ? 'home-button active' : 'home-button'} onClick={handleHomeButton}></Button>
        <Button className={activeButton === 'search' ? 'search-button-active' : 'search-button'} onClick={handlePostSearchButton}></Button>
        <Button className='add-post-button' onClick={onAddPostButton}>+</Button>
        <Button className={activeButton === 'followed' ? 'followed-button active' : 'followed-button'} onClick={handleFollowedPostsButton}></Button>
        <Button className={activeButton === 'saved' ? 'saved-button active' : 'saved-button'} onClick={handleSavedPostsButton}></Button>
    </footer>
}