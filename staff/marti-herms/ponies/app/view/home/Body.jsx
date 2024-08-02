import logic from '../../logic'

import Post from './Post'
import Profile from './Profile'

import { useEffect, useState } from 'react'

const Body = ({ refreshStamp, feed, onProfile, onFollow }) => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            const userId = logic.getUserId()

            if (!user) {
                logic.getUser(userId)
                    .then(user => setUser(user))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else if (user.id !== feed) {
                logic.getUser((feed === 'home' || feed === 'saved' || feed === 'followed') ? userId : feed)
                    .then(user => setUser(user))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            }

            if (feed === 'home') {
                logic.getAllPosts()
                    .then(posts => setPosts(posts))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else if (feed === 'saved') {
                logic.getUserSavedPosts()
                    .then(posts => setPosts(posts))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else if (feed === 'followed') {
                logic.getFollowedUserPosts()
                    .then(posts => setPosts(posts))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else {
                logic.getUserPosts(feed)
                    .then(posts => setPosts(posts))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [refreshStamp, feed])

    const handleUserProfile = (userId) => {
        try {
            onProfile(userId)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeletedPost = () => {
        refreshPosts()
    }

    const handlePostLiked = () => {
        refreshPosts()
    }

    const handlePostSaved = () => {
        if (feed === 'saved') {
            try {
                logic.getUserSavedPosts()
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
    }

    const handlePostEdited = () => {
        refreshPosts()
    }

    const handleUserFollowed = () => {
        try {
            onFollow()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const refreshPosts = () => {
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

    return <main className="View--home">
        {user && user.id === feed && <Profile user={user} onChange={handleUserProfile} />}
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