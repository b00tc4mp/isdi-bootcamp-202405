import Input from './components/Input'
import VSeparator from './components/VSeparator'
import Container from './components/Container'
import Form from './components/Form'
import Button from './components/Button'
import Link from './components/Link'

export default function Login({ onRegisterClick }) {
    const handleLoginSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            //login logic
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
            <Form className='gap-14' onSubmit={handleLoginSubmit}>
                <Input id='username-input' type='text' placeholder='Username' />
                <Input id='password-input' type='password' placeholder='Password' />
                <Button className='bg-rose-500 hover:bg-rose-800' type='submit' >Login</Button>
                <Link className='text-xl underline underline-offset-2 hover:text-blue-500' onClick={onRegisterClick}>Register</Link>
            </Form>
        </Container>
    </main>
}