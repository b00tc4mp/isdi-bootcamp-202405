import { useState } from 'react'

import CreatePost from './CreatePost'
import Button from '../components/Button'
import Image from '../components/Image'
import Search from './Search'

const Footer = ({ onPostCreated }) => {
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const [searchPostVisible, setSearchPostVisible] = useState(false)

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

    const handleSearchPostClick = () => {
        setSearchPostVisible(true)
    }

    const handleCancelSearchPostClick = () => {
        setSearchPostVisible(false)
    }

    const handleSearchedPostClick = () => {
        setSearchPostVisible(false)
    }

    return <footer className="footer">

        <Button className={"add-post-button"} onClick={handleCreatePostClick}>
            <Image className={"add-post-button__icon"} src={"https://svgsilh.com/svg/1721865.svg"} />
        </Button>

        <Button className={"search-button"} onClick={handleSearchPostClick} >
            <Image className={"search-button__icon"} src={"https://svgsilh.com/svg/1976105.svg"} />
        </Button>

        {
            createPostVisible &&
            <CreatePost
                onPostCreated={handlePostCreated}
                onCancelCreatePost={handleCancelCreatePostClick} />
        }

        {
            searchPostVisible &&
            <Search
                onCancelSearchPost={handleCancelSearchPostClick}
                onPostSearched={handleSearchedPostClick} />
        }
    </footer >
}

export default Footer
