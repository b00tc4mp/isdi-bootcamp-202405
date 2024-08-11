import { useState, useEffect } from 'react'

import logic from '../../logic'
import Post from './Post'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'

export default function PostList({ refreshStamp }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [refreshStamp])

    // const handlePostDeleted = () => loadPosts()

    // const handlePostEdited = () => loadPosts()

    // const handlePostLikeToggled = () => loadPosts()

    // const handlePostFavToggled = () => loadPosts()

    // const handleUserFollowToggled = () => loadPosts()

    const loadPosts = () => {
        try {
            logic.getAllPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error()

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section>
        {/* TODO search section */}

        {posts.map(post => <Post
            key={post.id}
            post={post}
        // TODO handels 
        />)}
    </section>
}
