import logic from '../../logic'

import { useState, useEffect } from 'react'

import User from './User'

export default function UsersInvestorList({ refreshStamp }) {
    console.debug('UsersInvestorList -> call')

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.debug('UsersInvestorList -> useEffect')

        loadUsers()
    }, [refreshStamp])

    const handleUserMatchToggled = () => {
        console.debug('UsersInvestorList -> handleUserMatchToggled')
        loadUsers()
    }

    const handleUserLikeToggled = () => {
        console.debug('UsersInvestorList -> handleUserLikeToggled')
        loadUsers()
    }

    const handleUserDislikeToggled = () => {
        console.debug('UsersInvestorList -> handleUserDislikeToggled')
        loadUsers()
    }

    const loadUsers = () => {
        try {
            logic.getAllProjects()
                .then(users => {
                    setUsers(users)
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

    return <section className="flex  bg-cyan-900 h-full flex-col gap-4">
        {users.map(user => <User
            key={user.id}
            user={user}
            onUserLikeToggled={handleUserLikeToggled}
            onUserMatchToggled={handleUserMatchToggled}
            onUserDislikeToggled={handleUserDislikeToggled}
        />)}
    </section>
}