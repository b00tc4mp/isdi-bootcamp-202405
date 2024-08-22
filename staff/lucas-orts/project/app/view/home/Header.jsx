import { useState, useEffect } from 'react'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import logic from '../../logic'

export default function Header({ onHomeClick, onLogout, onLoginClick, isAuthenticated }) {
    const [name, setName] = useState(null)

    useEffect(() => {
        if (isAuthenticated) {
            try {
                logic.getUserName()
                    .then(name => setName(name))
                    .catch(error => {
                        console.error(error)
                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        } else {
            setName(null)
        }
    }, [isAuthenticated])

    const handleLogout = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return (
        <header className="fixed left-0 top-0 w-full flex justify-between items-center gap-2 bg-white p-2 box-border shadow-[0px_1px_1px_lightgray] dark:bg-black dark:text-white">
            <Container>
                <Button onClick={onHomeClick}>Home</Button>
                {!isAuthenticated ? (
                    <Button onClick={onLoginClick}>Login</Button> // Esto debe llamar a onLoginClick
                ) : (
                    <>
                        <Paragraph>{name}</Paragraph>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </Container>
        </header>
    )
}
