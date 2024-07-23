import AddPostSection from './AddPostSection'
import SearchSection from './SearchSection'
import Button from '../components/Button'

import { useState } from 'react'

import './Footer.css'

const Footer = ({ onHomeButtonClick, onSearch, onPostCreated, onFollowedButtonClick, onSavedPostsButtonClick }) => {
    const [addPostVisibility, setAddPostVisibility] = useState(null)
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

    const handleSearchUserButton = () => {
        setAddPostVisibility('searchUser')
        setActiveButton('search')
    }

    const handleUserSearched = (username) => {
        try {
            setAddPostVisibility(null)

            onSearch(username)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleAddPostButton = () => {
        setAddPostVisibility('addPost')
    }

    const handlePostCreated = () => {
        try {
            setAddPostVisibility(null)
            setActiveButton('home')

            onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancel = () => {
        setAddPostVisibility(null)
        setActiveButton(
            'home')
        onPostCreated()
    }

    return <footer className="Footer">
        {addPostVisibility === 'addPost' && <AddPostSection onPostCreated={handlePostCreated} onCancel={handleCancel} />}
        {addPostVisibility === 'searchUser' && <SearchSection onSearch={handleUserSearched} onCancel={handleCancel} />}
        <Button className={activeButton === 'home' ? 'Button--home active' : 'Button--home'} onClick={handleHomeButton}></Button>
        <Button className={activeButton === 'search' ? 'Button--search--active' : 'Button--search'} onClick={handleSearchUserButton}></Button>
        <Button className="Button--add--post" onClick={handleAddPostButton}>+</Button>
        <Button className={activeButton === 'followed' ? 'Button--followed active' : 'Button--followed'} onClick={handleFollowedPostsButton}></Button>
        <Button className={activeButton === 'saved' ? 'Button--saved active' : 'Button--saved'} onClick={handleSavedPostsButton}></Button>
    </footer>
}

export default Footer