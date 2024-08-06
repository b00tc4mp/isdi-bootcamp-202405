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

    return <footer className="fixed bottom-0 left-0 w-full flex justify-around bg-[#ff4cad] shadow-[0_-1px_1px] shadow-[#ff4cad]">

        <Button className={"rounded-[10px] h-[40px] w-[40px] bg-transparent border-none"} onClick={handleCreatePostClick}>
            <Image className={"h-[30px] w-[30px]"} src={"https://svgsilh.com/svg/1721865.svg"} />
        </Button>

        <Button className={"rounded-[10px] h-[40px] w-[40px] bg-transparent border-none"} onClick={handleSearchPostClick} >
            <Image className={"h-[30px] w-[30px]"} src={"https://svgsilh.com/svg/1976105.svg"} />
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
