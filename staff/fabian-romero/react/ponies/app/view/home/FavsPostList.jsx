import logic from '../../logic'

import { useState, useEffect } from 'react'

import Post from './Post'

import './PostList.css'

const FavsPostList = () => {
    console.debug('FavsPostList -> constructor')

    const [posts, setPosts] = useState([])

    useEffect(() => { // metodo que utiliza react para trabajar el modo asincro
        console.debug('FavsPostList -> useEffect')

        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])


    const handlePostDeleted = () => {
        console.debug('FavsPostList -> handlePostDeleted')

        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostEdited = () => {
        console.debug('FavsPostList -> handlePostEdited')

        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostLikeToggled = () => {
        console.debug('FavsPostList -> handlePostLikeToggled')

        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setPosts
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostFavToggled = () => {
        console.debug('FavsPostList -> handlePostFavToggled')

        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleUserFollowToggled = () => {
        console.debug('FavsPostList -> handleUserFollowToggled')

        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section className="PostList">
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

export default FavsPostList