import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

export default function Search() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSeachParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''
    const t = searchParams.get('type') || 'posts'

    useEffect(() => {
        setQuery(q)
    }, [q])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target
        const { value: query } = form.q
        const type = query.startsWith('@') ? 'users' : 'posts'

        if (!query.trim())
            navigate('/search')
        else if (location.pathname !== '/search')
            navigate(`/search?q=${encodeURIComponent(query)}&type=${type}`)
        else
            setSeachParams({ q: query, type })

        setQuery(query)
    }

    const handleInputChange = event => {
        const { value: query } = event.target
        setQuery(query)
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Input name='q' placeholder='search' value={query} onChange={handleInputChange} />
            <Button type='submit'>search</Button>
        </Form>
    </>
}