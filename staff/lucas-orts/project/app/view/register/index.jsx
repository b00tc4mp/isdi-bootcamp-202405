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
    const { alert } = useContext()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const phoneInput = form['phone-input']
        const addressInput = form['address-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const phone = phoneInput.value
        const address = addressInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, phone, address, password, passwordRepeat)
                .then(() => onRegister()) // Redirige después del registro
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
        onLoginClick() // Redirige a login cuando se hace clic en el enlace de Login
    }

    return <>
        <main className='flex flex-col items-center gap-4 bg-white dark:bg-black h-screen dark:text-white'>
            <Heading className='font-scatters'>Register</Heading>

            <Form onSubmit={handleRegisterSubmit} className='flex-col'>
                <Container className='flex-col items-start'>
                    <Label htmlFor='name-input'>Name</Label>
                    <Input type='text' id='name-input' name='name-input' placeholder='name' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='surname-input'>Surname</Label>
                    <Input type='text' id='surname-input' name='surname-input' placeholder='surname' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='email-input'>E-mail</Label>
                    <Input type='email' id='email-input' name='email-input' placeholder='email' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='phone-input'>Phone</Label>
                    <Input type='text' id='phone-input' name='phone-input' placeholder='phone' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='address-input'>Address</Label>
                    <Input type='text' id='address-input' name='address-input' placeholder='address' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='password-input'>Password</Label>
                    <Input type='password' id='password-input' name='password-input' placeholder='password' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='password-repeat-input'>Repeat Password</Label>
                    <Input type='password' id='password-repeat-input' name='password-repeat-input' placeholder='repeat password' />
                </Container>

                <Button type='submit'>Register</Button>
            </Form>

            <Link onClick={handleLoginClick}>Login</Link>
        </main>
    </>
}