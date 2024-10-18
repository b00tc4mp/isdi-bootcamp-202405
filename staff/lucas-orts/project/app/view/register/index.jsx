import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Image from '../library/Image'

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
        <main className='flex flex-col items-center gap-4 bg-white h-screen'>
            <Heading className='font-semibold text-xl mt-6'>Register</Heading>

            <Form onSubmit={handleRegisterSubmit} className='flex-col'>
                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='name-input' className='font-semibold mb-1'>Name</Label>
                    <Input type='text' id='name-input' name='name-input' placeholder='name' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='surname-input' className='font-semibold mb-1'>Surname</Label>
                    <Input type='text' id='surname-input' name='surname-input' placeholder='surname' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='email-input' className='font-semibold mb-1'>E-mail</Label>
                    <Input type='email' id='email-input' name='email-input' placeholder='email' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='phone-input' className='font-semibold mb-1'>Phone</Label>
                    <Input type='text' id='phone-input' name='phone-input' placeholder='phone' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='address-input' className='font-semibold mb-1'>Address</Label>
                    <Input type='text' id='address-input' name='address-input' placeholder='address' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='password-input' className='font-semibold mb-1'>Password</Label>
                    <Input type='password' id='password-input' name='password-input' placeholder='password' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='password-repeat-input' className='font-semibold mb-1'>Repeat Password</Label>
                    <Input type='password' id='password-repeat-input' name='password-repeat-input' placeholder='repeat password' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-center justify-center mt-6'>
                    <Button type='submit'>
                        <Image src='/icons/person-add.svg' alt='register icon' className='h-[30px] w-[30px]' />
                    </Button>
                </Container>
            </Form>
            <Paragraph className='font-semibold mt-6'>To log-in click the link below</Paragraph>
            <Link onClick={handleLoginClick} className='flex items-center justify-center mt-0.2'>
                <Image src='/icons/log-in.svg' alt='log-in link icon' className='h-[30px] w-[30px]' />
            </Link>
        </main>
    </>
}