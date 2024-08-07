import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../../logic/index.js'

import Post from './Post.jsx'

export default function ResultsPostList({ refreshStamp }) {
    console.debug('ResultsPostList -> call')

    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('ResultsPostList -> useEffect [refreshStamp, q]')

        loadPosts()
    }, [refreshStamp, q])

    const handlePostDeleted = () => {
        console.debug('ResultsPostList -> handlePostEdited')

        loadPosts()
    }

    const handlePostEdited = () => {
        console.debug('ResultPostList -> handlePostEdited')

        loadPosts()
    }

    const handlePostLikeToggled = () => {
        console.debug('ResultPostList -> handlePostLikeToggled')

        loadPosts()
    }

    const handlePostFavToggled = () => {
        console.debug('ResultPostList -> handlePostFavToggled')

        loadPosts()
    }

    const handleUserFollowToggled = () => {
        console.debug('ResultPostList -> handleUserFollowToggled')

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

    return <section className="flex flex-col gap-4 p-2">
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