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

    return <>
        <Container>
            <Form onSubmit={handleSearchEventSubmit}>
                <Container>
                    <Input type='text' name='q' id='search-event-input' placeholder='search' value={query} onChange={handleInputChange} />
                    <Button type='submit'>search</Button>
                </Container>
                <Container>
                    <span>0</span>
                    <span>2.5</span>
                    <span>5</span>
                    <span>7.5</span>
                    <span>10</span>
                </Container>
                <Input type='range' min='0' max='10' name='distance' />
            </Form>
        </Container>
    </>
}