import logic from '../../logic'

import { useState, useEffect } from 'react'

import Post from './Post'

import './PostList.css'

export default function PostList({ refreshStamp }) {
    console.debug('PostList -> call')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('PostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    const handlePostDeleted = () => {
        console.debug('PostList -> handlePostDeleted')

        loadPosts()
    }

    const handlePostEdited = () => {
        console.debug('PostList -> handlePostEdited')

        loadPosts()
    }

    const handlePostLikeToggled = () => {
        console.debug('PostList -> handlePostLikeToggled')

        loadPosts()
    }

    const handlePostFavToggled = () => {
        console.debug('PostList -> handlePostFavToggled')

        loadPosts()
    }

    const handleUserFollowToggled = () => {
        console.debug('PostList -> handleUserFollowToggled')

        loadPosts()
    }

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

    return <section className="flex flex-col gap-3">
        {posts.map(post => <Post
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onPostEdited={handlePostEdited}
            onPostLikeToggled={handlePostLikeToggled}
            onPostFavToggled={handlePostFavToggled}
            onUserFollowToggled={handleUserFollowToggled}
        />)}
    </section>
}