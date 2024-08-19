import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

export default function Search({ onChange }) {
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
            navigate('/search')
        else if (location.pathname !== '/search')
            navigate(`/search?q=${query}`)
        else
            setSearchParams({ q: query })

        setQuery(query)
    }

    const handleInputChange = (event) => {
        const { value: query } = event.target

        setQuery(query)

        onChange()
    }

    return <Form onSubmit={handleSubmit} className='flex h-[12%] mt-3 mb-2 gap-2 justify-start items-center text-black'>
        <Input name='q' placeholder='search: candy crush, @eden...' value={query} onChange={handleInputChange} />
        <Button className='bg-white w-9/12 h-10 px-3 py-1 text-2xl text-black rounded-md border border-solid border-black shadow-md shadow-black' type='submit'>Search</Button>
    </Form>
}