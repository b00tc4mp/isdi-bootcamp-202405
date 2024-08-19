import useContext from '../context'

import logic from '../../logic'
import Form from '../library/Form'
import Heading from '../library/Heading'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'


export default function Register({ onRegister, onLoginClick }) {
    const { alert } = useContext()

    const handleRegisterSubmit = event => {

        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const usernameInput = form['username-input']
        const roleInput = form['role-input']
        const emailInput = form['email-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const username = usernameInput.value
        const role = roleInput.value
        const email = emailInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, username, role, email, password, passwordRepeat)
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
        event.preventDefault()
        onLoginClick()
    }

    return <main className='flex items-center gap-4 text-base bg-gradient-to-b from-slate-700 to-slate-900 text-slate-300 min-h-screen'>

        <Form onSubmit={handleRegisterSubmit}>
            <Heading className='absolute top-0 ml-0 mt-8 mb-6 mr-4 font-bold text-3xl'>REGISTER</Heading>

            <Container className='flex flex-col'>
                <Label htmlFor='name-input'>name</Label>
                <Input type='text' id='name-input' name='name-input' placeholder='name' />
            </Container>

            <Container className='flex flex-col'>
                <Label htmlFor='username-input'>username</Label>
                <Input type='text' id='username-input' name='username-input' placeholder='username' />
            </Container>

            <Container className='flex flex-col'>
                <Label htmlFor='role-input'>role</Label>
                <select className='text-[inherit] rounded-[5px] border-[none] px-[.5rem] shadow-[0_4px_8px_rgba(0,0,0,0.2)] ' id='role-input' name='role-input'>
                    <option className='text-black max-h-screen' value='user'>user</option>
                    <option className='text-black' value='band'>band</option>
                    <option className='text-black' value='label'>label</option>
                    <option className='text-black' value='promoter'>promoter</option>
                    <option className='text-black' value='venue'>venue</option>
                </select>
            </Container>

            <Container className='flex flex-col'>
                <Label htmlFor='email-input'>email</Label>
                <Input type='email' id='email-input' name='email-input' placeholder='email' />
            </Container>

            <Container className='flex flex-col'>
                <Label htmlFor='password-input'>password</Label>
                <Input type='password' id='password-input' name='password-input' placeholder='password' />
            </Container>

            <Container className='flex flex-col'>
                <Label htmlFor='password-repeat-input'>repeat password</Label>
                <Input type='password' id='password-repeat-input' name='password-repeat-input' placeholder='repeat password' />
            </Container>

            <Button className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl font-bold' type='submit'>REGISTER</Button>

            <Link className='mx-auto text-lg' onClick={handleLoginClick}>login</Link>

        </Form>

    </main>
}