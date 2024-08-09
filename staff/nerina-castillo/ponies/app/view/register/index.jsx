import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'

import useContext from '../context'

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


    return <main className="flex flex-col items-center gap-4 text-base bg-gradient-to-l from-purple-100 to-indigo-300 text-purple-700 min-h-screen  dark:bg-slate-800  dark:text-white">
        <Container className="fixed start-0 top-0 w-full flex justify-end items-center bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] text-[30px] pt-[7px] pb-[7px] font-over text-3xl">Ponies</Container>

        <Heading className='mt-14 font-bold flex text-3xl' level={1}>Register </Heading>

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

