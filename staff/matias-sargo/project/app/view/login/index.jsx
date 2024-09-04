import logic from '../../logic'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'
import logoImage from '../../src/assets/logoImage.png'

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

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col justify-between bg-white w-full h-full max-w-xs">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Background"
                        className="w-full h-48 object-top"
                    />
                    <div className="absolute top-4 right-4">
                        <img
                            src={logoImage}
                            alt="Propthy Logo"
                            className="h-20"
                        />
                    </div>
                </div>
                <div className="p-4 flex-grow">
                    <Heading level="1" className="text-xl font-bold mb-6 text-center">Login</Heading>

                    <Form onSubmit={handleLoginSubmit} className="flex flex-col space-y-3"> {/* Reduce el espacio entre los campos */}
    <Container className="flex flex-col mb-2"> {/* Reduce el margen inferior entre los contenedores */}
        <Label htmlFor="username-input" className="mb-1">Username</Label> {/* Reduce el margen inferior del label */}
        <Input 
            type="text" 
            id="username-input" 
            name="username" 
            placeholder="Hello@propthy.com" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
        />
    </Container>

    <Container className="flex flex-col mb-2"> {/* Reduce el margen inferior entre los contenedores */}
        <Label htmlFor="password-input" className="mb-1">Password</Label> {/* Reduce el margen inferior del label */}
        <Input 
            type="password" 
            id="password-input" 
            name="password" 
            placeholder="Enter your password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
        />
    </Container>

    <Button 
        type="submit" 
        className="w-full bg-tiffany-500 text-white py-2 mt-2 rounded-md hover:bg-tiffany-600 transition duration-200"
    >
        Login
    </Button>
</Form>

                    <div className="text-center mt-4">
                        <Link onClick={handleRegisterClick} className="text-tiffany-500 font-semibold">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}



// import logic from '../../logic'

// import Heading from '../library/Heading'
// import Form from '../library/Form'
// import Label from '../library/Label'
// import Input from '../library/Input'
// import Container from '../library/Container'
// import Link from '../library/Link'
// import Button from '../library/Button'

// import useContext from '../../context'

// import { errors } from 'com'

// const { NotFoundError, CredentialsError } = errors

// export default function Login({ onLogin, onRegisterClick }) {
//     console.debug('Login -> call')

//     const { alert } = useContext()

//     const handleLoginSubmit = event => {
//         console.debug('Login -> handleLoginSubmit')

//         event.preventDefault()

//         const form = event.target

//         const usernameInput = form['username-input']
//         const passwordInput = form['password-input']

//         const username = usernameInput.value
//         const password = passwordInput.value

//         try {
//             logic.loginUser(username, password)
//                 .then(() => onLogin())
//                 .catch(error => {
//                     console.error(error)

//                     let message = error.message

//                     if (error instanceof NotFoundError || error instanceof CredentialsError)
//                         message = 'incorrect username and/or password'

//                     alert(message)
//                 })
//         } catch (error) {
//             console.error(error)

//             alert(error.message)
//         }
//     }

//     const handleRegisterClick = event => {
//         console.debug('Login -> handleRegisterClick')

//         event.preventDefault()

//         onRegisterClick()
//     }

//     return <main className="flex flex-col items-center gap-4 bg-white dark:bg-black h-screen dark:text-white">
//         <Heading level="1">Login</Heading>

//         <Form onSubmit={handleLoginSubmit} className="flex-col">
//             <Container className="flex-col items-start">
//                 <Label htmlFor="username-input">Username</Label>
//                 <Input type="text" id="username-input" name="username" placeholder="username" />
//             </Container>

//             <Container className="flex-col items-start">
//                 <Label htmlFor="password-input">Password</Label>
//                 <Input type="password" id="password-input" name="password" placeholder="password" />
//             </Container>

//             <Button type="submit">Login</Button>
//         </Form>

//         <Link onClick={handleRegisterClick}>Register</Link>
//     </main>
// }

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