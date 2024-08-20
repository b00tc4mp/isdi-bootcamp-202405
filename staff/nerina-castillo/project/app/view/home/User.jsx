import { useEffect, useState } from 'react'

import logic from '../../logic'
import Avatar from './Avatar'
import Button from '../library/Button'
import Container from '../library/Container'
import Heading from '../library/Heading'

export default function User({ user, onUserFollowToggled }) {
    const [isFollowing, setIsFollowing] = useState(user.following)

    useEffect(() => {
        setIsFollowing(user.following)
    }, [user])

    const handleFollowUserClick = () => {
        try {
            logic.toggleFollowUser(user.id)
                .then(() => {
                    setIsFollowing(prev => !prev)
                    onUserFollowToggled()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.confirmMessage)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className='border-b border--b border-gray-500 ml-2 mr-2'>
        <Container className='flex justify-between items-center m-[.5rem]'>
            <Container className='flex items-center gap-1'>
                <Avatar url={user.avatar} alt={`${user.username}'s avatar`} />
                <Heading className='font-bold text-slate-400 text-lg'>{user.username}</Heading>
            </Container>

            <Button onClick={handleFollowUserClick}>{isFollowing ? 'unfollow' : 'follow'}</Button>

        </Container>
    </article>
}