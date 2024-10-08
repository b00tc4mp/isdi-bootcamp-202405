import { useState, useEffect } from 'react'
import logic from '../../logic'
import User from './User'
import Container from '../library/Container'
import Heading from '../library/Heading'

export default function BandList(refreshStamp) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [refreshStamp])

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

    return <section className='mb-[40px] flex flex-col gap-4'>
        <Heading className='mt-3 ml-2 text-xl font-bold -mb-4'>venues</Heading>

        <Container>
            {users.map(user => <User
                key={user.id}
                user={user}
                onUserFollowToggled={handleUserFollowToggled}
            />)}
        </Container>
    </section>
}