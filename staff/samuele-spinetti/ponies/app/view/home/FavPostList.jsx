import logic from '../../logic'

import { useState, useEffect } from 'react'

import Post from './Post'

const FavPostList = () => {
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
            logic.getAllFavPosts()
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

export default FavPostList