import { useState, useEffect } from 'react'
import useContext from '../context.js'

import logic from '../../logic'

import Heading from '../library/Heading'
import Container from '../library/Container'

import CreatePost from './CreatePost'

export default function Chats() {
    // const loadPosts = () => {
    //     try {
    //         logic.getAllPosts()
    //             .then(posts => setPosts(posts))
    //             .catch(error => {
    //                 console.error(error)

    //                 alert(error.message)
    //             })
    //     } catch (error) {
    //         console.error(error)

    //         alert(error.message)
    //     }
    // }

    return <>
        <Container className="flex flex-row items-center justify-around h-20">
            <Heading className="flex flex-col justify-center items-center text-[#000000] text-[20px] font-bold h-12">QueerCareChats</Heading>
        </Container>
        {/* {createPostVisible && <PrivateChat />} */}
        {/* <section className="flex flex-col gap-6 mb-24">
            {posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={handlePostDeleted}
                onPostLikeToggled={handlePostLikeToggled}
            />)}
        </section> */}
    </>
}