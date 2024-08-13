import logic from '../../logic/index.js'

import Container from '../library/Container.jsx'
import Button from '../library/Button.jsx'

export default function Header({ onLogout }) {
    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <header>
        <Container>

            <Button onClick={handleLogoutClick}>Logout</Button>
        </Container>

    </header>
}