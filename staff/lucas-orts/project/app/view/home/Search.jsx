import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Label from '../library/Label'
import Container from '../library/Container'
import Image from '../library/Image'

import useContext from '../context'
import Paragraph from '../library/Paragraph'

export default function Search() {
    const { alert } = useContext()
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    const [distance, setDistance] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const qDistance = searchParams.get('distance') || ''
    const qName = searchParams.get('name') || ''
    const qType = searchParams.get('type') || ''

    // Al iniciar, sincroniza los parámetros de búsqueda en la URL con los estados
    useEffect(() => {
        setDistance(qDistance)
        setName(qName)
        setType(qType)
    }, [qDistance, qName, qType])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { value: distance } = form.distance
        const { value: name } = form.name
        const { value: type } = form.type

        // Valida que `distance` sea un número válido con incrementos de 0.5
        const distanceValue = parseFloat(distance.trim())
        if (isNaN(distanceValue) || distanceValue < 0.5 || distanceValue % 0.5 !== 0) {
            alert('Distance must be a number starting from 0.5 and in steps of 0.5.')
            return
        }

        // Construye los parámetros de búsqueda dinámicamente
        const params = { distance: distanceValue }
        if (name.trim()) params.name = name.trim()
        if (type.trim()) params.type = type.trim()

        // Redirige o actualiza los parámetros de la búsqueda
        if (location.pathname !== '/search') {
            navigate(`/search?${new URLSearchParams(params)}`)
        } else {
            setSearchParams(params)
        }
    }

    const handleDistanceChange = event => {
        setDistance(event.target.value)
    }

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleTypeChange = event => {
        setType(event.target.value)
    }

    return <Form onSubmit={handleSubmit} className='flex-col justify-center items-center text-black'>
        <Container className='flex-col items-start mt-6' >
            <Label htmlFor='distance-input' className='font-semibold mb-1'>Distance (required, steps of 0.5)</Label>
            <Input name='distance' id='distance-input' placeholder='Distance in km' type='number' value={distance} onChange={handleDistanceChange} min='0.5' step='0.5' required className='border border-gray-300 rounded-lg p-0.5' />
        </Container>

        <Container className='flex-col items-start mt-6'>
            <Label htmlFor='name-input' className='font-semibold mb-1'>Name (optional)</Label>
            <Input name='name' id='name-input' placeholder='Product name' value={name} onChange={handleNameChange} className='border border-gray-300 rounded-lg p-0.5' />
        </Container>

        <Container className='flex-col items-start mt-6'>
            <Label htmlFor='type-input' className='font-semibold mb-1'>Type (optional)</Label>
            <Input name='type' id='type-input' placeholder='Product type' value={type} onChange={handleTypeChange} className='border border-gray-300 rounded-lg p-0.5' />
        </Container>
        <Container className='flex items-center mt-6'>
            <Button type='submit' className='border border-black rounded-full py-0.5 px-2'>
                <Container className='flex items-center justify-center space-x-0.5'>
                    <Image src='/icons/search.svg' alt='search icon' className='h-[30px] w-[30px]' />
                    <Paragraph className='font-semibold'>Search</Paragraph>
                </Container>
            </Button>
        </Container>
    </Form>
}