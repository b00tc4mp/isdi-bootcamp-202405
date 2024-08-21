import { useState, useEffect } from 'react'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import logic from '../../logic' // Asegúrate de importar la lógica

export default function Header({ onHomeClick, onLogout, isAuthenticated }) {
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
            setName(null) // Clear the name when the user is not authenticated
        }
    }, [isAuthenticated])

    const handleLogout = () => {
        try {
            logic.logoutUser() // Lógica para cerrar sesión
            onLogout() // Llama al callback para actualizar el estado en Home
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
                    <Button>Login</Button>
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