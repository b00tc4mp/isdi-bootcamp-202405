import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'

import logic from '../../logic'

export default function Password({ onAccept, onCancel }) {
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
        <Container className='fixed w-screen top-0 h-screen bg-black opacity-50'>
        </Container>

        <Container className='fixed w-screen top-0 h-screen flex items-center justify-center'>
            <Container className='p-4 border bg-white flex-col'>
                <Form onSubmit={handlePasswordSubmit} className='flex-col'>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='old-password-input'>Old Password</Label>
                        <Input type='password' id='old-password-input' name='old-password-input' placeholder='old password' />
                    </Container>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='new-password-input'>New Password</Label>
                        <Input type='password' id='new-password-input' name='new-password-input' placeholder='new password' />
                    </Container>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='repeat-new-password-input'>Repeat New Password</Label>
                        <Input type='password' id='repeat-new-password-input' name='repeat-new-password-input' placeholder='repeat new password' />
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