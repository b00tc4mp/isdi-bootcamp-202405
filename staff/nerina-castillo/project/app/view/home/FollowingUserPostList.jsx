import { useState, useEffect } from 'react'
import logic from '../../logic'
import Post from './Post'
import Container from '../library/Container'

export default function FollowingPostList({ refreshStamp }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [refreshStamp])

    const handlePostDeleted = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()

    const handleUserFollowToggled = () => loadPosts()

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

    const handleCommentCreated = () => { }

    return <Container className='mt-[40px] mb-[40px] flex flex-col gap-4'>
        {posts.map(post => <Post
            key={post.id}
            post={post}
            onCommentCreated={handleCommentCreated}
            onPostDeleted={handlePostDeleted}
            onPostLikeToggled={handlePostLikeToggled}
            onUserFollowToggled={handleUserFollowToggled}
        />)}
    </Container>
}