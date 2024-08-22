import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'

import useContext from '../../context'

export default function Register({ onRegister, onLoginClick }) {
    console.debug('Register -> call')

    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        console.debug('Register -> handleRegisterSubmit')

        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const dniInput = form['dni-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const dni = dniInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, username, dni, password, passwordRepeat)
                .then(() => onRegister())
                .catch(error => {
                    console.error(error)

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        console.debug('Register -> handleLoginClick')

        event.preventDefault()

        onLoginClick()
    }

    return <main className="flex flex-col items-center gap-4 bg-white dark:bg-black h-screen dark:text-white">
        <Heading className="font-scatters">Register</Heading>

        <Form onSubmit={handleRegisterSubmit} className="flex-col">
            <Container className="flex-col items-start">
                <Label htmlFor="name-input">Name</Label>
                <Input type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="surname-input">Surname</Label>
                <Input type="text" id="surname-input" name="surname" placeholder="surname" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="email-input">E-mail</Label>
                <Input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="dni-input">Dni</Label>
                <Input type="text" id="dni-input" name="dni" placeholder="Dni/Nie" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="password-input">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="password-repeat-input">Repeat Password</Label>
                <Input type="password" id="password-repeat-input" name="password-repeat" placeholder="repeat password" />
            </Container>

            <Button type="submit">Register</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>
}

// import { useState } from 'react';

// export default function Register({ onRegister, onLoginClick }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Lógica de registro aquí
//         onRegister();
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
//                 <h2 className="text-2xl font-bold mb-4">Register</h2>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="border p-2 mb-4 w-full"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="border p-2 mb-4 w-full"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="border p-2 mb-4 w-full"
//                 />
//                 <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
//                 <button type="button" onClick={onLoginClick} className="text-blue-500 mt-4">Login</button>
//             </form>
//         </div>
//     );
// }