import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Image from '../library/Image'

import useContext from '../context'

import logic from '../../logic'

export default function PriceProduct({ product, onAccept, onCancel }) {
    const { alert } = useContext()

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
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 items-center bg-black opacity-50 z-10' />
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 flex items-center justify-center z-20'>
            <Container className='p-6 border bg-white rounded-lg shadow-lg flex-col items-center justify-center space-y-6'>
                <Form onSubmit={handlePriceSubmit} className='flex-col items-center justify-center space-y-4'>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='minprice-input' className='font-semibold mb-2'>Min Price</Label>
                        <Input type='number' id='minprice-input' name='minprice-input' placeholder='minprice' step='0.01' className='w-full p-2 border rounded-md' />
                    </Container>
                    <Container className='flex-col items-start w-full'>
                        <Label htmlFor='maxprice-input' className='font-semibold mb-2'>Max Price</Label>
                        <Input type='number' id='maxprice-input' name='maxprice-input' placeholder='maxprice' step='0.01' className='w-full p-2 border rounded-md' />
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