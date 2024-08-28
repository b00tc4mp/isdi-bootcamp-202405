import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'
import useContext from '../context'

export default function UserInvestor({ onRegister, onLoginClick }) {
    console.debug('Register -> call')

    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        console.debug('Register -> handleRegisterSubmit')

        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const phoneNumberInput = form['phone-number-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']
        const imageInput = form['image-input']
        const descriptionInput = form['description-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const phoneNumber = phoneNumberInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value
        const image = imageInput.value
        const description = descriptionInput.value

        try {
            logic.registerInvestor(name, surname, email, phoneNumber, username, password, passwordRepeat, image, description)
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


    return <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-cyan-50 to-cyan-200 text-gray-800 p-8">
        <Heading
            level="1"
            className="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-8">
            ⚡️Register⚡️
        </Heading>

        <Form
            onSubmit={handleRegisterSubmit}
            className="flex flex-col items-center gap-3 bg-white bg-opacity-80 p-6 rounded-lg shadow-2xl w-full max-w-md" >

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="name-input" className="text-xs text-gray-700 font-medium"> Name </Label>
                <Input
                    type="text"
                    id="name-input"
                    name="name-input"
                    placeholder="name"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="surname-input" className="text-xs text-gray-700"> Surname </Label>
                <Input
                    type="text"
                    id="surname-input"
                    name="surname-input"
                    placeholder="surname"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="email-input" className="text-xs text-gray-700"> E-mail </Label>
                <Input
                    type="email"
                    id="email-input"
                    name="email-input"
                    placeholder="email"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="phone-number-input" className="text-xs text-gray-700">  Phone Number </Label>
                <Input
                    type="number"
                    id="phone-number-input"
                    name="phone-number-input"
                    placeholder="Phone Number"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="username-input" className="text-xs text-gray-700"> Username </Label>
                <Input
                    type="text"
                    id="username-input"
                    name="username-input"
                    placeholder="username"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="password-input" className="text-xs text-gray-700"> Password </Label>
                <Input
                    type="password"
                    id="password-input"
                    name="password-input"
                    placeholder="password"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="password-repeat-input" className="text-xs text-gray-700">
                    Password Repeat
                </Label>
                <Input
                    type="password"
                    id="password-repeat-input"
                    name="password-repeat-input"
                    placeholder="password repeat"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="image-input" className="text-xs text-gray-700"> Image </Label>
                <Input
                    type="text"
                    id="image-input"
                    name="image-input"
                    placeholder="Image"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="description-input" className="text-xs text-gray-700"> Bio </Label>
                <Input
                    type="text"
                    id="description-input"
                    name="description-input"
                    placeholder="Description"
                    className="w-full mt-0.5 p-1 bg-white border border-cyan-300 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            </Container>

            <Button
                type="submit"
                className="mt-2 px-2 py-1 text-sm bg-cyan-300 text-gray-800 border border-transparent rounded-md shadow-sm transition-transform transform hover:scale-95 hover:bg-cyan-400 hover:text-yellow-500" > Create Investor
            </Button>
        </Form>

        <Link
            onClick={handleLoginClick}
            className="mt-4 text-sm text-cyan-600 hover:text-yellow-500 transition-colors" > Login
        </Link>
    </main>
}    