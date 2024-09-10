import { useNavigate } from 'react-router-dom'

import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Button from '../library/Button'

import useContext from '../context'


export default function AddProduct({ }) {
    const { alert } = useContext()
    const navigate = useNavigate() // Agregar useNavigate

    const handleAddProductSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const typeInput = form['type-input']
        const minprizeInput = form['minprize-input']
        const maxprizeInput = form['maxprize-input']
        const imageInput = form['image-input']
        const latitudeInput = form['latitude-input']
        const longitudeInput = form['longitude-input']

        const name = nameInput.value
        const type = typeInput.value
        const minprize = parseFloat(minprizeInput.value.trim())  // Cambiado a número
        const maxprize = parseFloat(maxprizeInput.value.trim())  // Cambiado a número
        const image = imageInput.value
        const latitude = parseFloat(latitudeInput.value.trim())
        const longitude = parseFloat(longitudeInput.value.trim())
        const location = {
            type: 'Point',
            coordinates: [latitude, longitude]
        }

        try {
            logic.createProduct(name, type, minprize, maxprize, image, location)
                .then(() => {
                    // Llamada exitosa: redirigir a /products
                    navigate('/products') // Redirige a ProductList
                })
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
        <main className='flex flex-col items-center gap-4 bg-white dark:bg-black h-screen dark:text-white'>
            <Heading className='font-scatters'>Register</Heading>

            <Form onSubmit={handleAddProductSubmit} className='flex-col'>
                <Container className='flex-col items-start'>
                    <Label htmlFor='name-input'>Name</Label>
                    <Input type='text' id='name-input' name='name-input' placeholder='name' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='type-input'>Type</Label>
                    <Input type='text' id='type-input' name='type-input' placeholder='type' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='minprize-input'>Minprize</Label>
                    <Input type='number' id='minprize-input' name='minprize-input' placeholder='minprize' step='0.01' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='maxprize-input'>Maxprize</Label>
                    <Input type='number' id='maxprize-input' name='maxprize-input' placeholder='maxprize' step='0.01' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='image-input'>Image</Label>
                    <Input type='text' id='image-input' name='image-input' placeholder='image' />
                </Container>

                <Container className='flex-col items-start'>
                    <Label htmlFor='location'>Location</Label>
                    <Input id='latitude-input' name='latitude-input' placeholder='latitude' />
                    <Input id='longitude-input' name='longitude-input' placeholder='longitude' />
                </Container>
                <Button type='submit'>Add Product</Button>
            </Form>
        </main>
    </>
}