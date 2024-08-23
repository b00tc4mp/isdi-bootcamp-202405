import useContext from '../context.js'
import logic from '../../logic/index'
import Link from '../library/Link'
import Heading from '../library/Heading'
import Input from '../library/Input'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Button from '../library/Button'

import { errors } from '../../../com/index.js'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)
                .then(() => onLogin())
                .catch(error => {
                    console.error(error)

                    let message = error.message

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'incorrect username or password'

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    return <main className='flex items-center gap-4 text-base bg-gradient-to-b from-slate-700 to-slate-900 text-slate-300 min-h-screen'>

        <Form onSubmit={handleLoginSubmit}>
            <Heading className='absolute top-0 ml-0 mt-8 mb-6 mr-4 font-bold text-3xl'>LOGIN</Heading>

            <Container className='flex flex-col'>
                <Label htmlFor='username-input'>username</Label>
                <Input type='text' id='username-input' name='username-input'></Input>
            </Container>

            <Container className='flex flex-col'>
                <Label htmlFor='password-input'>password</Label>
                <Input type='password' id='password-input' name='password-input'></Input>
            </Container>

            <Button className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl font-bold' type='submit'>LOGIN</Button>

            <Link className='mt-4 mx-auto text-lg' href='' onClick={handleRegisterClick}>i haven't an account</Link>

        </Form>

    </main>
}