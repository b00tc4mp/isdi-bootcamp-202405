import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import Post from './Post'

export default function ResultsPostList({ refreshStamp }) {
    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [refreshStamp, q])

    const handlePostDeleted = () => {
        loadPosts()
    }

    const handlePostEdited = () => {
        loadPosts()
    }

    const handlePostLikeToggled = () => {
        loadPosts()
    }

    const handlePostFavToggled = () => {
        loadPosts()
    }

    const handleUserFollowToggled = () => {
        loadPosts()
    }

    const loadPosts = () => {
        if (q !== null)
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

    return <section className="flex flex-col gap-4">
        {posts.map(post => <Post
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onPostEdited={handlePostEdited}
            onPostLikeToggled={handlePostLikeToggled}
            onPostFavToggled={handlePostFavToggled}
            onFollowUserToggled={handleUserFollowToggled}
        />)}
    </section>
}