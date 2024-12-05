import Link from '../library/Link'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'

import logic from '../../logic'

export default function Register({ onRegister, onLoginClick }) {
    const handleRegisterSubmit = (event) => {
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
                    alert('user succesfully registered')

                    onRegister()
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


    return <main className='w-screen h-screen flex flex-col justify-center items-center gap-4 text-base bg-custom-2'>
        <Heading className='text-white text-5xl font-sans'>Register</Heading>

        <Form className='flex-col justify-center gap-4 w-[80%] max-w-[230px]' onSubmit={handleRegisterSubmit}>
            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='name-input'>Name:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='name-input' type='text' name='name' placeholder='name' />
            </Container>

            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='surname-input'>Surname:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='surname-input' type='text' name='surname' placeholder='surname' />
            </Container>

            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='email-input'>Email:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='email-input' type='email' name='email' placeholder='email' />
            </Container>

            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='username-input'>Username:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='username-input' type='text' name='username' placeholder='username' />
            </Container>

            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='password-input'>Password:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='password-input' type='password' name='password' placeholder='password' />
            </Container>

            <Container className='flex-col justify-center items-start'>
                <Label className='text-white' htmlFor='password2-input'>Repeat Password:</Label>
                <Input className='p-1 w-full rounded shadow-sm shadow-black border-0 hover:bg-blue-200' id='password2-input' type='password' name='repassword' placeholder='repeat password' />
            </Container>

            <Button className='mt-[2px] w-[60%] self-center p-1 rounded shadow shadow-black bg-red-300 hover:bg-red-600' type='submit'>Register</Button>
        </Form>

        <Link onClick={onLoginClick} text='Login' />
    </main>
}