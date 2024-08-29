import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import useContext from '../context'

import Container from '../library/Container'
import UserBanner from './UserBanner'

import logic from '../../logic'

export default function UserList({ onUserClick, onChatClick }) {
    const { alert } = useContext()

    const location = useLocation()

    const listType = location.pathname.slice(1, location.pathname.lastIndexOf('/'))

    const { userId } = useParams()

    const [users, setUsers] = useState([])

    useEffect(() => {
        if (listType === 'following')
            loadFollowing()
        else if (listType === 'followers')
            loadFollowers()
    }, [])

    const loadFollowers = () => {
        try {
            logic.getUserFollowers(userId)
                .then(users => setUsers(users))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const loadFollowing = () => {
        try {
            logic.getUserFollowing(userId)
                .then(users => setUsers(users))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <Container className='flex flex-col items-center w-full' >
        <h2 className='dark:text-white font-bold mt-3 mb-2'>{listType.toUpperCase()}</h2>
        {users.map(user => <UserBanner key={user.id} user={user} onInteraction={listType === 'following' ? loadFollowing : loadFollowers} onUserClick={onUserClick} onChatClick={onChatClick} />)}
    </Container>
}