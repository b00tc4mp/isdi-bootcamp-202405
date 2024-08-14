import { useEffect, useState, } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import Post from './Post'
import Heading from '../library/Heading'
import Search from './Search'

export default function ResultsPostList({ refreshStamp }) {
    const [searchParams] = useSearchParams()
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    const q = searchParams.get('q') || ''

    useEffect(() => {
        if (q) {
            loadItems()
        } else {
            setUsers([])
            setPosts([])
        }
    }, [refreshStamp, q])

    const handlePostDeleted = () => loadItems()

    const handleLikeToggled = () => loadItems()

    const handleUserFollowToggled = () => loadItems()

    const loadItems = () => {
        try {
            logic.searchItems(q)
                .then(({ posts, users }) => {
                    setUsers(users)
                    setPosts(posts)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <section>
        <Search />

        <div>
            <Heading level='2'>Users</Heading>
            {users.map(user => (
                <Heading key={user.id} level='3'>{user.username}</Heading>
            ))}
        </div>

        <div>
            <Heading level='2'>Posts</Heading>
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    onPostDeleted={handlePostDeleted}
                    onPostLikeToggled={handleLikeToggled}
                    onUserFollowToggled={handleUserFollowToggled}
                />
            ))}
        </div>
    </section>

}