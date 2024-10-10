import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Image from '../library/Image'

import useContext from '../context'

import logic from '../../logic'

export default function Password({ onAccept, onCancel }) {
    const { alert } = useContext()

    const handlePasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const oldPasswordInput = form['old-password-input']
        const newPasswordInput = form['new-password-input']
        const newPasswordRepeatInput = form['repeat-new-password-input']

        const oldPassword = oldPasswordInput.value
        const newPassword = newPasswordInput.value
        const newPasswordRepeat = newPasswordRepeatInput.value

        try {
            logic.updatePassword(oldPassword, newPassword, newPasswordRepeat)
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
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 items-center bg-black opacity-50 z-20' />
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 flex items-center justify-center z-20'>
            <Container className='p-6 border bg-white rounded-lg shadow-lg flex-col items-center justify-center space-y-6'>
                <Form onSubmit={handlePasswordSubmit} className='flex-col items-center justify-center space-y-4'>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='old-password-input' className='font-semibold mb-2'>Old Password</Label>
                        <Input type='password' id='old-password-input' name='old-password-input' placeholder='old password' className='w-full p-2 border rounded-md' />
                    </Container>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='new-password-input' className='font-semibold mb-2'>New Password</Label>
                        <Input type='password' id='new-password-input' name='new-password-input' placeholder='new password' className='w-full p-2 border rounded-md' />
                    </Container>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='repeat-new-password-input' className='font-semibold mb-2'>Repeat New Password</Label>
                        <Input type='password' id='repeat-new-password-input' name='repeat-new-password-input' placeholder='repeat new password' className='w-full p-2 border rounded-md' />
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