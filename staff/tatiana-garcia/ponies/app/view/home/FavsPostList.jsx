import logic from '../../logic'

import { useState, useEffect } from 'react'

import Post from './Post'

export default function FavsPostList() {
    console.debug('FavsPostList -> constructor')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('FavsPostList -> componentDidMount')

        loadPosts()
    }, [])

    const handlePostDeleted = () => {
        console.debug('FavsPostList -> handlePostDeleted')

        loadPosts()
    }

    const handlePostEdited = () => {
        console.debug('FavsPostList -> handlePostEdited')

        loadPosts()
    }

    const handlePostLikeToggled = () => {
        console.debug('FavsPostList -> handlePostLikeToggled')

        loadPosts()
    }

    const handlePostFavToggled = () => {
        console.debug('FavsPostList -> handlePostFavToggled')

        loadPosts()
    }

    const handleUserFollowToggled = () => {
        console.debug('FavsPostList -> handleUserFollowToggled')

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