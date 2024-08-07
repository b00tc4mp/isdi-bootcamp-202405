import logic from '../logic'

import Heading from './components/Heading'
import Container from './components/Container'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Button from './components/Button'
import Link from './components/Link'

function Register({ onRegister, onLoginClick }) {
    console.debug('Register -> call')

    const handleRegisterSubmit = event => {
        console.debug('Register -> handleRegisterSubmit')

        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)
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

    return <main className="flex flex-col items-center gap-4 text-[1.1rem]">
        <Heading className="m-0 italic text-purple-900 text-3xl">Register</Heading>

        <Form onSubmit={handleRegisterSubmit} >
            <Container className="flex gap-[.2rem] p-[0_.5rem] font-bold text-rgb(88, 5, 88) flex-col justify-start">
                <Label htmlFor="name-input">{'Name'}</Label>
                <Input className="text-[length:inherit] rounded-[5px] border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="flex gap-[.2rem] p-[0_.5rem] font-bold text-rgb(88, 5, 88) flex-col justify-start">
                <Label htmlFor="surname-input">{'Surname'}</Label>
                <Input className="text-[length:inherit] rounded-[5px] border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="text" id="surname-input" name="surname" placeholder="surname" />
            </Container>

            <Container className="flex gap-[.2rem] p-[0_.5rem] font-bold text-rgb(88, 5, 88) flex-col justify-start">
                <Label htmlFor="email-input">{'Email'}</Label>
                <Input className="text-[length:inherit] rounded-[5px]  border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="flex gap-[.2rem] p-[0_.5rem] font-bold text-rgb(88, 5, 88) flex-col justify-start">
                <Label htmlFor="username-input">{'Username'}</Label>
                <Input className="text-[length:inherit] rounded-[5px] border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex gap-[.2rem] p-[0_.5rem] font-bold text-rgb(88, 5, 88) flex-col justify-start">
                <Label htmlFor="password-input">{'Password'}</Label>
                <Input className="text-[length:inherit] rounded-[5px] border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="password" name="password" id="password-input" placeholder="password" />
            </Container>

            <Container className="flex gap-[.2rem] p-[0_.5rem] font-bold text-rgb(88, 5, 88) flex-col justify-start">
                <Label htmlFor="password-repeat-input">Repeat Password</Label>
                <Input className="text-[length:inherit] rounded-[5px] border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="password" id="password-repeat-input" name="password-repeat" placeholder="repeat password" />
            </Container>

            <Button className="rounded-2xl text-[length:inherit] bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold text-rgb(88, 5, 88)" type="submit">{'Register'}</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>

}

export default Register