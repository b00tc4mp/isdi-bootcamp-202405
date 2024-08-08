import logic from '../../logic'

import Form from '../library/Form'
import Label from '../library/Label'
import Button from '../library/Button'
import Link from '../library/Link'
import Heading from '../library/Heading'
import Input from '../library/Input'
import Container from '../library/Container'

import useContext from '../context'

export default function Register({ onRegister, onLoginClick }) {
    console.debug('Register -> call')

    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        console.debug('Register -> handleRegisterSubmit')

        event.preventDefault() //para que no se resetee la pagina

        const form = event.target //apunta al elemento que provoca el evento

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password2-input']

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
        console.debug('Register -> handleLoginClick  ')

        event.preventDefault()

        onLoginClick()
    }

    return <main className="flex flex-col items-center gap-4 text-md font-serif dark:bg-pink-900 h-screen dark:text-white">
        <Heading className="font-fredoka">Register</Heading>

        <Form onSubmit={handleRegisterSubmit} className="flex-col gap-[0.9rem] min-w-[80%] mt-[40px]">
            <Container className="flex-col items-start" >
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="flex-col items-start" >
                <Label htmlFor="surname">Surname</Label>
                <Input type="text" id="surname-input" surname="surname" placeholder="surname" />
            </Container>

            <Container className="flex-col items-start" >
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="flex-col items-start" >
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username-input" name="username"
                    placeholder="username" />
            </Container>

            <Container className="flex-col items-start" >
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className="flex-col items-start" >
                <Label htmlFor="password2">Repeat Password</Label>
                <Input type="password" id="password2-input" name="password2"
                    placeholder="repeat password" />
            </Container>

            <Button className="font-inherit bg-[#f981fb] rounded-[5px] font-bold h-[35px] w-[90%]" type="submit">Register</Button>
        </Form >

        <Link href="" onClick={handleLoginClick}>Login</Link>
    </main >

}

