import logic from '../../logic'

import { useState, useEffect } from 'react'

import Post from './Post'

import useContext from '../context'

export default function FollowingPostList() {
    const { alert } = useContext()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [])

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
        try {
            logic.getAllFollowingUserPosts()
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
            onUserFollowToggled={handleUserFollowToggled}
        />)}
    </section>
}