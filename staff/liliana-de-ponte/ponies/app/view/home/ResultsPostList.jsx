import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import Post from './Post'

import './PostList.css'

export default function ResultsPostList({ refreshStamp }) {
    console.debug('PostList -> call')

    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('PostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    const handlePostDeleted = () => {
        console.debug('PostList -> handlePostDeleted ')

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
            logic.searchPosts(q)
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

    return <section className="post-list">
        {posts.map(post => <Post
            post={post}
            key={post.id}
            onPostDeleted={handlePostDeleted}
            onPostEdited={handlePostEdited}
            onPostLikeToggled={handlePostLikeToggled}
            onPostFavToggled={handlePostFavToggled}
            onUserFollowToggled={handleUserFollowToggled}

        />)}
    </section>

}
