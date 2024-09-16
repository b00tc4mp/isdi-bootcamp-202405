import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Container from '../library/Container'
import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'

export default function SearchEvent() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')
    const [distance, setDistance] = useState('10')

    const q = searchParams.get('q') || ''

    useEffect(() => {
        if (q) {
            setQuery(q)
        }
        if (searchParams.get('distance')) {
            setDistance(searchParams.get('distance'))
        }
    }, [q, searchParams])

    const handleSearchEventSubmit = event => {
        event.preventDefault()

        const form = event.target
        const { value: input } = form.input

        navigator.geolocation.getCurrentPosition(position => {
            const coords = `${position.coords.latitude},${position.coords.longitude}`

            setSearchParams({ q: input, distance, coords })

            setQuery(input)
        }, error => {
            console.error(error)
            alert(error.message)
        })
    }

    const handleInputChange = event => {
        const { value } = event.target
        setQuery(value)
    }

    return (
        <Container className='mb-3 flex flex-col gap-2'>
            <Form className='mt-5' onSubmit={handleSearchEventSubmit}>
                <Container className='flex flex-row gap-2 justify-between mb-2'>
                    <Input
                        name='input'
                        placeholder='Search by location'
                        className='w-full'
                        value={query}
                        onChange={handleInputChange}
                    />
                    <Button type='submit' className='ml-2'>
                        <Image className='w-[25px] h-[20px]' src='./search.png' />
                    </Button>
                </Container>
                <Container className='flex justify-between w-full'>
                    <span>0 km</span>
                    <span>2.5 km</span>
                    <span>5 km</span>
                    <span>7.5 km</span>
                    <span>10 km</span>
                </Container>
                <Input
                    type='range'
                    min='0'
                    max='10'
                    name='distance'
                    className='h-2 w-full appearance-none rounded-sm bg-slate-300'
                    value={distance}
                    onChange={e => setDistance(e.target.value)}
                />
            </Form>
        </Container>
    )
}