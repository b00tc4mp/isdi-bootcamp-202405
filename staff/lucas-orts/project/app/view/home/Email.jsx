import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Image from '../library/Image'

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
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 items-center bg-black opacity-50 z-10' />
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 flex items-center justify-center z-20'>
            <Container className='p-6 border bg-white rounded-lg shadow-lg flex-col items-center justify-center space-y-6'>
                <Form onSubmit={handleEmailSubmit} className='flex-col items-center justify-center space-y-4'>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='email-input' className='font-semibold mb-2'>E-mail</Label>
                        <Input type='email' id='email-input' name='email-input' placeholder='email' className='w-full p-2 border rounded-md' />
                    </Container>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='password-input' className='font-semibold mb-2'>Password</Label>
                        <Input type='password' id='password-input' name='password-input' placeholder='password' className='w-full p-2 border rounded-md' />
                    </Container>
                    <Container className='flex items-center justify-center space-x-4'>
                        <Button onClick={onCancel} type='button'>
                            <Image src='/icons/close.svg' alt='cancel icon' className='h-[30px] w-[30px]' />
                        </Button>
                        <Button type='submit'>
                            <Image src='/icons/save.svg' alt='accept icon' className='h-[30px] w-[30px]' />
                        </Button>
                    </Container>
                </Form>
            </Container>
        </Container>
    </>
}