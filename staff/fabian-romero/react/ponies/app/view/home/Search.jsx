import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

import './Search.css'

export default function Search() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSeachParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''

    useEffect(() => {
        setQuery(q)
    }, [q])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { value: query } = form.q

        if (!query.trim())
            navigate('/search')
        else if (location.pathname !== '/search')
            navigate(`/search?q=${query}`)
        else
            setSeachParams({ q: query })

        setQuery(query)
    }

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }


    return <Form onSubmit={handleSubmit} className="flex justify-center items-center text-black">
        <Input name="q" placeholder="search" value={query} onChange={handleInputChange} />
        <Button type="submit">🔍</Button>
    </Form>
}