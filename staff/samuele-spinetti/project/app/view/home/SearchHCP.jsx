import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Container from '../library/Container'
import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'

export default function SearchHCP({ onHealthCareProviderSearched }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''

    useEffect(() => {
        if (q)
            setQuery(q)
    }, [q])

    const handleSearchHealthCareProviderSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { value: query } = form.q

        if (!query.trim())
            navigate('/search')
        else if (location.pathname !== '/search')
            navigate(`/search?q=${query}`)
        else
            setSearchParams({ q: query })

        setQuery(query)

        onHealthCareProviderSearched()
    }

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }

    return <>
        <Container className="flex flex-row">
            <Form onSubmit={handleSearchHealthCareProviderSubmit}>
                <Input className="border border-black" type="text" name="q" id="search-input" placheholder="Search" defaultValue={query} value={query} onChange={handleInputChange} />
                <Button type="submit">
                    <Image className="h-[30px] w-[30px]" src="/searchIcon.svg" alt="Search icon" />
                </Button>
            </Form>
        </Container>
    </>
}