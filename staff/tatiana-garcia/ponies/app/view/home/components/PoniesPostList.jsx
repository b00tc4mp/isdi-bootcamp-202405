import { useEffect, useState } from 'react'

import logic from '../../../logic'

import './PostList.css'

import Post from './Post.jsx'

const PoniesPostList = () => {
    console.debug('PoniesPostList -> constructor')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.debug('PoniesPostList -> componentDidMount')

        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handlePostDeleted')

        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handlePostEdited')

        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handlePostLikeToggled')

        try {
            logic.getAllPoniesPosts((error, posts) => {
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

    const handlePostFavToggled = () => {
        console.debug('PoniesPostList -> handlePostFavToggled')

        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handleUserFollowToggled')

        try {
            logic.getAllPoniesPosts((error, posts) => {
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

    return <section className="post-list">
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

export default PoniesPostList