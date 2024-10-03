import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Image from '../library/Image'

import useContext from '../context'

import logic from '../../logic'

export default function Address({ onAccept, onCancel }) {
    const { alert } = useContext()

    const handleAddressSubmit = event => {
        event.preventDefault()

        const form = event.target

        const addressInput = form['address-input']

        const address = addressInput.value

        try {
            logic.updateUserAddress(address)
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
                <Form onSubmit={handleAddressSubmit} className='flex-col items-center justify-center space-y-4'>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='address-input' className='font-semibold mb-2'>Address</Label>
                        <Input type='text' id='address-input' name='address-input' placeholder='address' className='w-full p-2 border rounded-md' />
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