import { useState, useEffect } from 'react'
import useContext from '../context.js'

import logic from '../../logic'

import Heading from '../library/Heading'
import Button from '../library/Button'
import Container from '../library/Container'
import Image from '../library/Image.jsx'
import Paragraph from '../library/Paragraph'

import CreatePost from './CreatePost'
import CommunityRulesAlert from './CommunityRulesAlert'
import Post from './Post'

export default function Community() {
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const [rulesAccepted, setRulesAccepted] = useState(true)
    const [posts, setPosts] = useState([])
    const { alert } = useContext()

    useEffect(() => {
        try {
            logic.getCommunityAlert()
                .then(() => { })
            loadPosts()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handlePostDeleted = () => {
        loadPosts()
    }

    const handlePostLikeToggled = () => {
        loadPosts()
    }

    const handleCreatePostClick = () => {
        setCreatePostVisible(true)
    }

    const handleCancelCreatePostClick = () => {
        setCreatePostVisible(false)
    }

    const handlePostCreated = () => {
        setCreatePostVisible(false)

        loadPosts()
    }

    const handleAcceptRules = () => setRulesAccepted(false)

    const loadPosts = () => {
        try {
            logic.getAllPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        {rulesAccepted && <CommunityRulesAlert onAccept={handleAcceptRules} />}

        {rulesAccepted && (
            <Container className="flex flex-row items-center justify-around h-20">
                <Heading className="flex flex-col justify-center items-center text-[#000000] text-[20px] font-bold h-12">QueerCareCommunity</Heading>
                <Button onClick={handleCreatePostClick}><Image className="h-[30px] w-[30px]" src="./plusIcon.svg"></Image></Button>
            </Container>)}
        {createPostVisible && <CreatePost onPostCreated={handlePostCreated} onCancelCreatePost={handleCancelCreatePostClick} />}
        <section className="flex flex-col gap-6 mb-24">
            {posts.length === 0 ? (
                <Paragraph className="text-center text-gray-500">No chats yet.</Paragraph>
            ) : (
                posts.map(post => <Post
                    key={post.id}
                    post={post}
                    onPostDeleted={handlePostDeleted}
                    onPostLikeToggled={handlePostLikeToggled}
                />))}
        </section>
    </>
}