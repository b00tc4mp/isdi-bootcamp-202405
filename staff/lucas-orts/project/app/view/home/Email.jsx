import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import useContext from '../context'

import logic from '../../logic'

export default function Email({ onAccept, onCancel }) {
    const { alert } = useContext()
    const handleEmailSubmit = event => {
        event.preventDefault()

        const form = event.target

        const emailInput = form['email-input']
        const passwordInput = form['password-input']

        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.updateEmail(email, password)
                .then(() => onAccept()) // Redirige después del registro
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }
    return <>
        <Container className='fixed w-screen top-0 h-screen bg-black opacity-50'>
        </Container>

        <Container className='fixed w-screen top-0 h-screen flex items-center justify-center'>
            <Container className='p-4 border bg-white flex-col'>
                <Form onSubmit={handleEmailSubmit} className='flex-col'>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='email-input'>E-mail</Label>
                        <Input type='email' id='email-input' name='email-input' placeholder='email' />
                    </Container>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='password-input'>Password</Label>
                        <Input type='password' id='password-input' name='password-input' placeholder='password' />
                    </Container>
                    <Container className='items-center'>
                        <Button onClick={onCancel} type={'button'}>Cancel</Button>
                        <Button type={'submit'}>Ok</Button>
                    </Container>
                </Form>
            </Container>
        </Container>
    </>
}