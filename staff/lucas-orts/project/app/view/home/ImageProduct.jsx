import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'

import logic from '../../logic'

export default function ImageProduct({ product, onAccept, onCancel }) {
    const handleImageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const imageInput = form['image-input']

        const image = imageInput.value

        try {
            logic.updateProductImage(product.id, image)
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
                <Form onSubmit={handleImageSubmit} className='flex-col'>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='image-input'>Image</Label>
                        <Input type='text' id='image-input' name='image-input' placeholder='image' />
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