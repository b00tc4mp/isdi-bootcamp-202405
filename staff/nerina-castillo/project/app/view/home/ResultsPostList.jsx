import { useEffect, useState, } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import Post from './Post'
import Heading from '../library/Heading'
import Search from './Search'

export default function ResultsPostList({ refreshStamp }) {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'posts'
    const [items, setItems] = useState([])

    useEffect(() => {
        loadItems()
    }, [refreshStamp, q, type])

    const handleItemDeleted = () => loadItems()

    const handleItemEdited = () => loadItems()

    const handleLikeToggled = () => loadItems()

    const handleUserFollowToggled = () => loadItems()

    const loadItems = () => {
        try {
            logic.searchItems(q, type)
                .then(result => setItems(result[type]))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return (
        <section>

            {type === 'posts' ? (
                items.map(item => (
                    <Post
                        key={item.id}
                        post={item}
                        onPostDeleted={handleItemDeleted}
                        onPostEdited={handleItemEdited}
                        onPostLikeToggled={handleLikeToggled}
                        onUserFollowToggled={handleUserFollowToggled}
                    />
                ))
            ) : (
                <div>
                    {items.length > 0 ? (
                        items.map(user => (
                            <div key={user.id}>
                                <Heading level='2'>{user.username}</Heading>
                            </div>
                        ))
                    ) : (
                        <p>No users found</p>
                    )}
                </div>
            )}
        </section>
    );
}