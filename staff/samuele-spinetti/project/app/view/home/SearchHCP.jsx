import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Container from '../library/Container'
import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'
import Span from '../library/Span'

export default function SearchHCP() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q')
    const distance = searchParams.get('distance')

    useEffect(() => {
        if (q)
            setQuery(q, distance)
    }, [q, distance])

    const handleSearchHealthCareProviderSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { value: query } = form.q
        const { value: distance } = form.distance

        if (!query.trim())
            navigate('/search')
        else if (location.pathname !== '/search')
            navigate(`/search?q=${query}&distance=${distance}`)
        else
            setSearchParams({ q: query, distance })

        setQuery(query)
    }

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }

    return <>
        <Container>
            <Form onSubmit={handleSearchHealthCareProviderSubmit}>
                <Container className="flex flex-row items-center" >
                    <Input className="border border-black" type="text" name="q" id="search-input" placeholder="Search" value={query} onChange={handleInputChange} />
                    <Button type="submit">
                        <Image className="h-[30px] w-[30px]" src="/searchIcon.svg" alt="Search icon" />
                    </Button>
                </Container>
                <Container>
                    <Container className="flex justify-between w-full mt-3 text-xs">
                        <Span>0km</Span>
                        <Span>2.5km</Span>
                        <Span>5km</Span>
                        <Span>7.5km</Span>
                        <Span>10km</Span>
                    </Container>
                    <Input type="range" min="0" max="10" name="distance" className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-200 disabled:cursor-not-allowed" />
                </Container>
            </Form>
        </Container>
    </>
}