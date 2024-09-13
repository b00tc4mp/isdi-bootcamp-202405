import logic from '../../logic'

import { useState, useEffect } from 'react'

import User from './User'

export default function MatchList() {
    console.debug('MatchList -> call')

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.debug('MatchList -> useEffect')

        loadUsers()
    }, [])

    const handleUserLikeToggled = () => {
        console.debug('MatchList -> handleUserLikeToggled')

        loadUsers()
    }

    const handleUserDislikeToggled = () => {
        console.debug('MatchList -> handleUserDislikeToggled')

        loadUsers()
    }

    const handleUserMatchToggled = () => {
        console.debug('MatchList -> handleUserMatchToggled')

        loadUsers()
    }

    const loadUsers = () => {
        try {
            logic.getAllMatchs()
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

    return <section className="flex flex-col gap-4">
        {users.map(user => <User
            key={user.id}
            user={user}
            onUserLikeToggled={handleUserLikeToggled}
            onUserMatchToggled={handleUserMatchToggled}
            onUserDislikeToggled={handleUserDislikeToggled}
        />)}
    </section>
}