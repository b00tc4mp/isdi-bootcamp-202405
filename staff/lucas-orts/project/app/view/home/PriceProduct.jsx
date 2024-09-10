import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'

import logic from '../../logic'

export default function PriceProduct({ product, onAccept, onCancel }) {
    const handlePriceSubmit = event => {
        event.preventDefault()

        const form = event.target

        const minpriceInput = form['minprice-input']
        const maxpriceInput = form['maxprice-input']

        const minprice = parseFloat(minpriceInput.value.trim())  // Cambiado a número
        const maxprice = parseFloat(maxpriceInput.value.trim())  // Cambiado a número
        try {
            logic.updateProductPrice(product.id, minprice, maxprice)
                .then(() => onAccept())
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
                <Form onSubmit={handlePriceSubmit} className='flex-col'>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='minprice-input'>Min Price</Label>
                        <Input type='number' id='minprice-input' name='minprice-input' placeholder='minprice' step='0.01' />
                    </Container>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='maxprice-input'>Maxprice</Label>
                        <Input type='number' id='maxprice-input' name='maxprice-input' placeholder='maxprice' step='0.01' />
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