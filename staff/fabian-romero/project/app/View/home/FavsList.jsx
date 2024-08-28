import logic from '../../logic'

import { useState, useEffect } from 'react'

import User from './User'

export default function FavsList() {
    console.debug('FavsList -> call')

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.debug('FavsList -> useEffect')

        loadUsers()
    }, [])

    const handleUserLikeToggled = () => {
        console.debug('FavsList -> handleUserLikeToggled')

        loadUsers()
    }

    const handleUserDislikeToggled = () => {
        console.debug('FavsList -> handleUserDislikeToggled')

        loadUsers()
    }

    const handleUserFavToggled = () => {
        console.debug('FavsList -> handleUserFavToggled')

        loadUsers()
    }

    const loadUsers = () => {
        try {
            logic.getFavUsers()
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
            onUserFavToggled={handleUserFavToggled}
            onUserDislikeToggled={handleUserDislikeToggled}
        />)}
    </section>
}