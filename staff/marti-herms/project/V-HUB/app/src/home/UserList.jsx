import { useParams } from 'react-router-dom'

import useContext from '../context'

import Container from '../library/Container'

export default function UserList({ userList }) {
    const { alert } = useContext()

    const { userId } = useParams()

    return <Container>

    </Container>
}