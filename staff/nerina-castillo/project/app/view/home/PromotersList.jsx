import { useState, useEffect } from 'react'
import logic from '../../logic'
import User from './User'
import Container from '../library/Container'
import Heading from '../library/Heading'

export default function BandList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const handleUserFollowToggled = () => loadUsers()

    const loadUsers = () => {
        try {
            logic.getUsersByRole('promoter')
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
        <Heading className='mt-3 ml-2 text-xl font-bold -mb-4'>promoters</Heading>

        <Container>
            {users.map(user => <User
                key={user.id}
                user={user}
                onUserFollowToggled={handleUserFollowToggled}
            />)}
        </Container>
    </section>
}