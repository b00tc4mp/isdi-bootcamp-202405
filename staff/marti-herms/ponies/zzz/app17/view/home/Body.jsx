import logic from '../../logic'

import Post from './Post'
import Profile from './Profile'

import { useEffect, useState } from 'react'

const Body = ({ refreshStamp, feed, onProfile, onFollow }) => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            if (!user) {
                logic.getUser(logic.getUserUsername(), (error, user) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    setUser(user)
                })
            } else if (user.username !== feed) {
                logic.getUser((feed === 'home' || feed === 'saved' || feed === 'followed') ? logic.getUserUsername() : feed, (error, user) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    setUser(user)
                })
            }

            if (feed === 'home') {
                logic.getAllPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            } else if (feed === 'saved') {
                logic.getUserSavedPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            } else if (feed === 'followed') {
                logic.getFollowedUserPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            } else {
                logic.getUserPosts(feed, (error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [refreshStamp, feed])

    const handleUserProfile = (username) => {
        try {
            onProfile(username)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeletedPost = () => {
        try {
            logic.getAllPosts((error, posts) => {
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

    const handlePostLiked = () => {
        try {
            logic.getAllPosts((error, posts) => {
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

    const handlePostSaved = () => {
        if (feed === 'saved') {
            try {
                logic.getUserSavedPosts((error, posts) => {
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
    }

    const handlePostEdited = () => {
        try {
            logic.getAllPosts((error, posts) => {
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

    const handleUserFollowed = () => {
        try {
            onFollow()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <main className="View--home">
        {user && user.username === feed && <Profile user={user} onChange={handleUserProfile} />}
        <section className="Post-list">
            {posts.map(post => <Post key={post.id} post={post}
                onUserClick={handleUserProfile}
                onPostDeleted={handleDeletedPost}
                onPostEdited={handlePostEdited}
                onPostLiked={handlePostLiked}
                onPostSaved={handlePostSaved}
                onFollow={handleUserFollowed} />)}
        </section>
    </main>
}

export default Body