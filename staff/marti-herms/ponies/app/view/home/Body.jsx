import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logic from '../../logic'

import Post from './Post'
import Profile from './Profile'
import SearchResults from './SearchResults'


export default function Body({ refreshStamp, feed, onProfile, onFollow }) {
    const [posts, setPosts] = useState([])

    const { userId } = useParams()

    useEffect(() => {
        try {
            if (feed === 'home') {
                logic.getAllPosts()
                    .then(posts => setPosts(posts))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else if (feed === 'favs') {
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
            } else if (feed === 'profile') {
                logic.getUserPosts(userId)
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
        if (feed === 'favs') {
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

    const handleResults = (results) => {
        setPosts(results)
    }

    return <main className="View--home">
        {feed === 'profile' && <Profile userId={userId} postQuantity={posts.length} refreshStamp={refreshStamp} onChange={handleUserProfile} />}
        {feed === 'search' && <SearchResults onResult={handleResults} />}
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