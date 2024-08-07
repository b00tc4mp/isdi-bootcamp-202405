import Input from './components/Input'
import VSeparator from './components/VSeparator'
import Container from './components/Container'
import Form from './components/Form'
import Button from './components/Button'
import Link from './components/Link'

export default function Register({ onLoginClick, onRegister }) {
    const handleRegisterSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const emailInput = form['email-input']
        const passwordInput = form['password-input']
        const rePasswordInput = form['repassword-input']

        const username = usernameInput.value
        const email = emailInput.value
        const password = passwordInput.value
        const rePassword = rePasswordInput.value

        try {
            if (password !== rePassword) throw new Error('password are not the same')
            //register logic
        } catch (error) {
            console.error(error)
        }
    }

    return <main className='flex flex-row w-screen h-screen'>
        <Container type={1}>
            <img className='top-3 w-72 h-72' src='../images/logo.svg' alt='logo' />
            <h2 className='text-center text-7xl'>V-HUB</h2>
        </Container>
        <VSeparator />
        <Container type={2}>
            <Form className='gap-8' onSubmit={handleRegisterSubmit}>
                <Input id='username-input' type='text' placeholder='Username' />
                <Input id='email-input' type='email' placeholder='Email' />
                <Input id='password-input' type='password' placeholder='Password' />
                <Input id='repassword-input' type='password' placeholder='Repeat Password' />
                <Button type='submit' className='bg-rose-500 hover:bg-rose-800'>Register</Button>
                <Link className='text-xl underline underline-offset-2 hover:text-blue-500' onClick={onLoginClick}>Login</Link>
            </Form>
        </Container>
    </main>
}