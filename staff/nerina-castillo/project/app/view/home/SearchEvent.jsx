import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Container from '../library/Container'
import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

export default function SearchEvent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''
    const distance = searchParams.get('distance') || '10'

    useEffect(() => {
        if (q)
            setQuery(q, distance)
    }, [q, distance])

    const handleSearchEventSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { value: query } = form.q
        const { value: distance } = form.distance

        navigator.geolocation.getCurrentPosition(position => {
            const coords = `${position.coords.latitude},${position.coords.longitude}`

            if (!query.trim())
                navigate(`/search?q=${query}&distance=${distance}&coords=${coords}`)
            else if (location.pathname !== '/calendar')
                navigate('/calendar')
            else setSearchParams({ q: query, distance, coords })

            setQuery(query)
        }, error => {
            console.error(error)

            alert(error.message)
        })
    }

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }

    return <Container className='mb-3 flex flex-col gap-2'>
        <Form className='mt-5' onSubmit={handleSearchEventSubmit}>
            <Container className='flex flex-col gap-[.2rem]'>
                <Input type='text' name='q' id='search-event-input' placeholder='search events' value={query} onChange={handleInputChange} />
                <Button type='submit' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold mb-2'>SEARCH</Button>

            </Container>
            <Container className='flex justify-between w-full'>
                <span>0 km</span>
                <span>2.5 km</span>
                <span>5 km</span>
                <span>7.5 km</span>
                <span>10 km</span>
            </Container>
            <Input type='range' min='0' max='10' name='distance' className='h-2 w-full appearance-none rounded-sm bg-slate-300' />
        </Form>
    </Container>
}