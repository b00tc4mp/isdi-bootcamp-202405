import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'
import Image from '../library/Image'

import useContext from '../context.js'
import Paragraph from '../library/Paragraph'

export default function Register({ onRegister, onLoginClick }) {
    // console.debug('Register -> call')

    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        // console.debug('Register -> handleRegisterSubmit')

        event.preventDefault()

        const Form = event.target

        const nameInput = Form['name-Input']
        const surnameInput = Form['surname-Input']
        const roleInput = Form['role-Input']
        const emailInput = Form['email-Input']
        const usernameInput = Form['username-Input']
        // const avatarInput = Form['avatar-Input']
        const passwordInput = Form['password-Input']
        const passwordRepeatInput = Form['password-repeat-Input']

        const name = nameInput.value
        const surname = surnameInput.value
        const role = roleInput.value
        const email = emailInput.value
        const username = usernameInput.value
        // const avatar = avatar.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, role, email, username, password, passwordRepeat)
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
        // console.debug('Register -> handleLoginClick')

        event.preventDefault()

        onLoginClick()
    }

    return (
        <main className="flex flex-col items-center justify-start mt-12 h-vh p-4 font-poppins text-lg text-title bg-white dark:bg-inherit">
            <div className="flex flex-col items-start w-full max-w-md gap-6">

                <div className="flex flex-row items-baseline gap-2">
                    <Heading
                        level={2}
                        className="text-xl dark:text-dark_white">
                        Welcome to
                    </Heading>

                    <Heading
                        level={1}
                        className="text-4xl font-bevan font-bold text-cities ml-2">
                        cities
                    </Heading>
                </div>

                <div className="flex flex-col justify-start gap-2">
                    <Paragraph
                        className="text-4xl dark:text-dark_white font-medium mb-10">
                        Register
                    </Paragraph>
                </div>

                <button className="flex items-center gap-2 bg-blue-50 font-light text-sea px-5 py-2 rounded-lg">
                    <img
                        src="/logo/logoGoogle.png"
                        alt="Google Icon"
                        className="w-12 h-15 m-0 p-0" />
                    Sign up with Google
                </button>

                <Form
                    onSubmit={handleRegisterSubmit}
                    className="flex flex-col gap-4 w-full">

                    <Container className="flex-col items-start w-full">
                        <Label
                            htmlFor="name-Input"
                            className="text-md dark:text-dark_white">
                            Name
                        </Label>
                        <Input
                            type="text"
                            id="name-Input"
                            name="name"
                            placeholder="Name"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey" />
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label
                            htmlFor="surname-Input"
                            className="text-md dark:text-dark_white">
                            Surname
                        </Label>
                        <Input
                            type="text"
                            id="surname-Input"
                            name="surname"
                            placeholder="Surname"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey" />
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label
                            htmlFor="role-Input">
                            You will be...
                        </Label>

                        <select
                            id="role-Input"
                            name="role"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey">
                            <option value="user">User</option>
                            <option value="organizer">Organizer</option>
                        </select>
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label
                            htmlFor="email-Input"
                            className="text-md dark:text-dark_white">
                            Insert your email
                        </Label>
                        <Input
                            type="email"
                            id="email-Input"
                            name="email"
                            placeholder="Email"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey" />
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label
                            htmlFor="username-Input"
                            className="text-md dark:text-dark_white">
                            Username
                        </Label>
                        <Input
                            type="text"
                            id="username-Input"
                            name="username"
                            placeholder="Username"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey" />
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label
                            htmlFor="password-Input"
                            className="text-md dark:text-dark_white">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password-Input"
                            name="password"
                            placeholder="Password"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey" />
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label htmlFor="password-repeat-Input"
                            className="text-md dark:text-dark_white">
                            Repeat Password
                        </Label>
                        <Input
                            type="password"
                            id="password-repeat-Input"
                            name="password-repeat"
                            placeholder="Repeat Password"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey" />
                    </Container>

                    <Button
                        type="submit"
                        className="bg-sea text-white w-full py-2 rounded-lg shadow-md mt-[2.5rem]">
                        Register
                    </Button>
                </Form>

                <p className="text-[13px] text-light_grey dark:text-dark_white">
                    Already have an account?{' '}
                    <Link
                        onClick={handleLoginClick}
                        className="font-light text-sea">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}