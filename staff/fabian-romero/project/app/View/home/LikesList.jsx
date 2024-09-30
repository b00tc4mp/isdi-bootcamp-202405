import logic from '../../logic'

import { useState, useEffect } from 'react'

import User from './User'

export default function LikesList() {
    console.debug('LikesList -> call')

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.debug('LikesList -> useEffect')

        loadUsers()
    }, [])


    const handleUserLikeToggled = () => {
        console.debug('LikesList -> handleUserLikeToggled')

        loadUsers()
    }

    const handleUserDislikeToggled = () => {
        console.debug('LikesList -> handleUserDislikeToggled')

        loadUsers()
    }

    const loadUsers = () => {
        try {
            logic.getLikeUsers()
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

    return <section className="flex bg-cyan-900 h-full flex-col gap-4">
        {users.map(user => <User
            key={user.id}
            user={user}
            onUserLikeToggled={handleUserLikeToggled}
            onUserDislikeToggled={handleUserDislikeToggled}
        />)}
    </section>
}