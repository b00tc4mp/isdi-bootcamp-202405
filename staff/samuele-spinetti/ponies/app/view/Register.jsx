import logic from '../logic'

import Link from './components/Link'
import Heading from './components/Heading'
import Input from './components/Input'
import Label from './components/Label'
import Button from './components/Button'
import Container from './components/Container'
import Form from './components/Form'

function Register({ onRegister, onLoginClick }) {

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

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
                .then(() => {
                    onRegister()

                    alert('user successfully registered')
                })
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
        event.preventDefault()

        onLoginClick()
    }

    return <main className="flex flex-col items-center gap-4 text-[1rem]">
        <Heading>Register</Heading>

        <Form className={"flex flex-col gap-1 min-w-[80%]"} onSubmit={handleRegisterSubmit}>
            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"name-input"}>Name</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} type={"text"} id={"name-input"} name={"name"} placeholder={"Name"} />
            </Container>

            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"surname-input"}>Surname</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} type={"text"} id={"surname-input"} name={"surname"} placeholder={"Surname"} />
            </Container>

            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"email-input"}>Email</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} type={"email"} id={"email-input"} name={"email"} placeholder={"Email"} />
            </Container>

            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"username-input"}>Username</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} type={"text"} id={"username-input"} name={"username"} placeholder={"Username"} />
            </Container>

            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"password-input"}>Password</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} type={"password"} id={"password-input"} name={"password"} placeholder={"Password"} />
            </Container>

            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"password2-input"}>Repeat Password</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} type={"password"} id={"password2-input"} name={"password-repeat"} placeholder={"Repeat Password"} />
            </Container>

            <Button className={"text-inherit rounded-[20px]"} type={"submit"}>Register</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>
}

export default Register