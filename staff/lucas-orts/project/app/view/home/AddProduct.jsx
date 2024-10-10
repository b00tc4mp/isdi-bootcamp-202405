import { useNavigate } from 'react-router-dom'

import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Button from '../library/Button'
import Image from "../library/Image"

import useContext from '../context'


export default function AddProduct({ }) {
    const { alert } = useContext()
    const navigate = useNavigate() // Agregar useNavigate

    const handleAddProductSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const typeInput = form['type-input']
        const minpriceInput = form['minprice-input']
        const maxpriceInput = form['maxprice-input']
        const imageInput = form['image-input']
        const latitudeInput = form['latitude-input']
        const longitudeInput = form['longitude-input']

        const name = nameInput.value
        const type = typeInput.value
        const minprice = parseFloat(minpriceInput.value.trim().replace(',', '.'))  // Cambiado a número
        const maxprice = parseFloat(maxpriceInput.value.trim().replace(',', '.'))  // Cambiado a número
        const image = imageInput.value
        const latitude = parseFloat(latitudeInput.value.trim())
        const longitude = parseFloat(longitudeInput.value.trim())
        const location = {
            type: 'Point',
            coordinates: [latitude, longitude]
        }

        try {
            logic.createProduct(name, type, minprice, maxprice, image, location)
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
        <main className='flex flex-col items-center gap-4 bg-white h-screen'>
            <Heading className='font-semibold text-xl'>Add Product</Heading>

            <Form onSubmit={handleAddProductSubmit} className='flex-col'>
                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='name-input' className="font-semibold mb-1">Name</Label>
                    <Input type='text' id='name-input' name='name-input' placeholder='name' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='type-input' className="font-semibold mb-1">Type</Label>
                    <Input type='text' id='type-input' name='type-input' placeholder='type' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='minprice-input' className="font-semibold mb-1">Minprice</Label>
                    <Input type='number' id='minprice-input' name='minprice-input' placeholder='minprice' step='0.01' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='maxprice-input' className="font-semibold mb-1">Maxprice</Label>
                    <Input type='number' id='maxprice-input' name='maxprice-input' placeholder='maxprice' step='0.01' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='image-input' className="font-semibold mb-1">Image</Label>
                    <Input type='text' id='image-input' name='image-input' placeholder='image' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>

                <Container className='flex-col items-start mt-6'>
                    <Label htmlFor='location' className="font-semibold mb-1">Location</Label>
                    <Input id='latitude-input' name='latitude-input' placeholder='latitude' className='border border-gray-300 rounded-lg p-0.5 mb-2' />
                    <Input id='longitude-input' name='longitude-input' placeholder='longitude' className='border border-gray-300 rounded-lg p-0.5' />
                </Container>
                <Container className='flex-col items-center mt-6'>
                    <Button type='submit'>
                        <Image src='/icons/save.svg' alt='accept icon' className='h-[30px] w-[30px]' />
                    </Button>
                </Container>
            </Form>
        </main>
    </>
}