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

        const name = form['name-input'].value
        const surname = form['surname-input'].value
        const email = form['email-input'].value
        const username = form['username-input'].value
        const dni = form['dni-input'].value
        const password = form['password-input'].value
        const passwordRepeat = form['password-repeat-input'].value

        try {
            logic.registerUser(name, surname, email, username, dni, password, passwordRepeat)
                .then(() => onRegister())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
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

    return (
        <main className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <Heading className="text-2xl font-bold mb-6 text-center">Register</Heading>

                <Form onSubmit={handleRegisterSubmit} className="flex flex-col space-y-4">
                    <Container className="flex flex-col">
                        <Label htmlFor="name-input">Name</Label>
                        <Input 
                            type="text" 
                            id="name-input" 
                            name="name" 
                            placeholder="Name" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
                        />
                    </Container>

                    <Container className="flex flex-col">
                        <Label htmlFor="surname-input">Surname</Label>
                        <Input 
                            type="text" 
                            id="surname-input" 
                            name="surname" 
                            placeholder="Surname" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
                        />
                    </Container>

                    <Container className="flex flex-col">
                        <Label htmlFor="username-input">Username</Label>
                        <Input 
                            type="text" 
                            id="username-input" 
                            name="username" 
                            placeholder="Username" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
                        />
                    </Container>

                    <Container className="flex flex-col">
                        <Label htmlFor="email-input">Email</Label>
                        <Input 
                            type="email" 
                            id="email-input" 
                            name="email" 
                            placeholder="Hello@propthy.com" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
                        />
                    </Container>

                    <Container className="flex flex-col">
                        <Label htmlFor="dni-input">DNI</Label>
                        <Input 
                            type="text" 
                            id="dni-input" 
                            name="dni" 
                            placeholder="DNI/NIE" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
                        />
                    </Container>

                    <Container className="flex flex-col">
                        <Label htmlFor="password-input">Password</Label>
                        <Input 
                            type="password" 
                            id="password-input" 
                            name="password" 
                            placeholder="Enter your password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
                        />
                    </Container>

                    <Container className="flex flex-col">
                        <Label htmlFor="password-repeat-input">Repeat Password</Label>
                        <Input 
                            type="password" 
                            id="password-repeat-input" 
                            name="password-repeat" 
                            placeholder="Repeat your password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany-500"
                        />
                    </Container>

                    <Button 
                        type="submit" 
                        className="w-full bg-tiffany-500 text-white py-2 rounded-md hover:bg-tiffany-600 transition duration-200"
                    >
                        Register
                    </Button>
                </Form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">Do you have an account? <Link onClick={handleLoginClick} className="text-tiffany-500 font-semibold">Login</Link></p>
                </div>
            </div>
        </main>
    )
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