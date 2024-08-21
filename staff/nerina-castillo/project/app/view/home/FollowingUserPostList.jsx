import { useState, useEffect } from 'react'
import logic from '../../logic'
import Post from './Post'
import Container from '../library/Container'
import Heading from '../library/Heading'

export default function FollowingPostList({ refreshStamp }) {
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState(null)

    useEffect(() => {
        loadPosts()
    }, [refreshStamp])

    useEffect(() => {

        try {
            logic.getUserName()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

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

    const handleCommentCreated = () => loadPosts()

    return <Container className='mt-[40px] mb-[40px] flex flex-col gap-3'>
        <Heading className='mt-2 ml-2 text-2xl font-bold'>{username}</Heading>
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