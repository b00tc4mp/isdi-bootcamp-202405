import { useState, useEffect } from 'react'
import logic from '../../logic'
import User from './User'
import Container from '../library/Container'

export default function BandList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const handleUserFollowToggled = () => loadUsers()

    const loadUsers = () => {
        try {
            logic.getUsersByRole('venue')
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

    return <Container>
        {users.map(user => <User
            key={user.id}
            user={user}
            onUserFollowToggled={handleUserFollowToggled}
        />)}
    </Container>
}