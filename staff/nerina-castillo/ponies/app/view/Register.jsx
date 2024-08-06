import logic from '../logic'

import Heading from './components/Heading'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

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


    return <main className="view--login">
        <Container className="fixed start-0 top-0 w-full flex justify-end items-center bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] text-[30px] pt-[7px] pb-[7px]">Ponies</Container>

        <Heading className='fixed start-0 top-[50px] text-purple-600' level={1}>Register </Heading>

        <Form className={"Form"} onSubmit={handleRegisterSubmit}>
            <Container className="flex flex-col ">
                <Label htmlFor={"name-input"}>Name</Label>
                <Input type={"text"} id={"name-input"} name={"name"} placeholder={"name"} />
            </Container>

            <Container className="flex flex-col ">
                <Label htmlFor={"surname-input"}>Surname</Label>
                <Input type={"text"} id={"surname-input"} name={"surname"} placeholder={"surname"} />
            </Container>

            <Container className="flex flex-col ">
                <Label htmlFor={"email-input"}>Email</Label>
                <Input type={"email"} id={"email-input"} name={"email"} placeholder={"email"} />
            </Container>

            <Container className="flex flex-col ">
                <Label htmlFor={"username-input"}>Username</Label>
                <Input type={"text"} id={"username-input"} name={"username"} placeholder={"userame"} />
            </Container>

            <Container className="flex flex-col ">
                <Label htmlFor={"password-input"} >Password</Label>
                <Input type={"password"} id={"password-input"} name={"password"} placeholder={"password"} />
            </Container>

            <Container className="flex flex-col ">
                <Label htmlFor={"password2-input"} >Repeat Password</Label>
                <Input type={"password"} id={"password-repeat-input"} name={"password2"}
                    placeholder="repeat password" />
            </Container>

            <Button className={"bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[10px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] px-[.2rem] mt-[1rem]"} type={"submit"} >Register </Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>

    </main>

}

export default Register