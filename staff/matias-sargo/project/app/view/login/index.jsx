import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'

import useContext from '../../context'

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const { alert } = useContext()

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)
                .then(() => onLogin())
                .catch(error => {
                    console.error(error)

                    let message = error.message

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'incorrect username and/or password'

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    return <main className="flex flex-col items-center gap-4 bg-white dark:bg-black h-screen dark:text-white">
        <Heading level="1">Login</Heading>

        <Form onSubmit={handleLoginSubmit} className="flex-col">
            <Container className="flex-col items-start">
                <Label htmlFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex-col items-start">
                <Label htmlFor="password-input">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button type="submit">Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>
}

// import { useState } from 'react';

// export default function Login({ onLogin, onRegisterClick }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Lógica de autenticación aquí
//         onLogin();
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
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
//                 <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
//                 <button type="button" onClick={onRegisterClick} className="text-blue-500 mt-4">Register</button>
//             </form>
//         </div>
//     );
// }