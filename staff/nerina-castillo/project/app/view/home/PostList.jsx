import { useState, useEffect } from 'react'

import logic from '../../logic'
import Post from './Post'
import Button from '../library/Button'

export default function PostList({ refreshStamp }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [refreshStamp])

    const handlePostDeleted = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()

    const handleUserFollowToggled = () => loadPosts()

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

    return <section>

        {posts.map(post => <Post
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onUserFollowToggled={handleUserFollowToggled}
        // TODO handels 
        />)}
    </section>
}
