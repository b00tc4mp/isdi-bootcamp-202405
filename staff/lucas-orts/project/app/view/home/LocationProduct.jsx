import Button from '../library/Button'
import Form from '../library/Form'
import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'

import logic from '../../logic'

export default function LocationProduct({ product, onAccept, onCancel }) {
    const handleLocationSubmit = event => {
        event.preventDefault()

        const form = event.target

        const latitudeInput = form['latitude-input']
        const longitudeInput = form['longitude-input']

        const latitude = parseFloat(latitudeInput.value.trim())
        const longitude = parseFloat(longitudeInput.value.trim())
        const location = {
            type: 'Point',
            coordinates: [latitude, longitude]
        }

        try {
            logic.updateProductLocation(product.id, location)
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
                <Form onSubmit={handleLocationSubmit} className='flex-col'>
                    <Container className='flex-col items-start'>
                        <Label htmlFor='location'>Location</Label>
                        <Input id='latitude-input' name='latitude-input' placeholder='latitude' />
                        <Input id='longitude-input' name='longitude-input' placeholder='longitude' />
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