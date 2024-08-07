import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'

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

    return <Form onSubmit={handleSubmit} className="flex items-center justify-center">
        <Input className="border-[lightgray] border-[1px] rounded-[.25rem] text-[inherit] w-full px-[.5rem]" name="q" placeholder="search" value={query} onChange={handleInputChange} />
        <Button className="flex float-start" type="submit">🔎</Button>
    </Form>
}