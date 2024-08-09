import { useContext } from 'react'
import Context from '../../Context'

import Container from '../library/Container'
import Button from '../library/Button'
import Image from '../library/Image'

export default function Header({ onLogout }) {
    const { alert } = useContext(Context)

    const handleLogoutClick = () => {
        try {
            handleLogoutClick.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <header className="fixed w-full flex justify-round">

        <Container>
            <Button >
                <Image />
            </Button>
        </Container>

        <Container >
            <Button onClick={handleLogoutClick}>Logout</Button>
        </Container>

    </header>
}