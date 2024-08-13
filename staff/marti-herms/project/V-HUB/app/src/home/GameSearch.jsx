import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

export default function GameSearch() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''

    useEffect(() => {
        setQuery(q)
    }, [q])

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const { value: query } = form.q

        if (!query.trim())
            navigate('/games/search')
        else if (location.pathname !== '/games/search')
            navigate(`/games/search?q=${query}`)
        else
            setSearchParams({ q: query })

        setQuery(query)
    }

    const handleInputChange = (event) => {
        const { value: query } = event.target

        setQuery(query)
    }

    return <Form onSubmit={handleSubmit} className='flex justify-start items-center text-black'>
        <Input name='q' placeholder='search' value={query} onChange={handleInputChange} />
        <Button className='bg-white' type='submit'>Search</Button>
    </Form>
}