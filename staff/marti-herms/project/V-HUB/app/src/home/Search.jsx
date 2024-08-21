import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { TbListSearch as SearchIcon } from 'react-icons/tb'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

export default function Search() {
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
        const input = document.getElementById('search-input')

        const { value: query } = input

        if (!query.trim())
            navigate('/search')
        else if (location.pathname !== '/search')
            navigate(`/search?q=${query}`)
        else
            setSearchParams({ q: query })

        setQuery(query)
    }

    return <Form onSubmit={handleSubmit} className='flex flex-row h-[12%] mt-3 mb-2 gap-2 justify-center items-center text-black'>
        <Input name='q' id='search-input' placeholder='search: candy crush, @eden...' value={query} onChange={handleInputChange} />
        <Button type='submit'><SearchIcon className='w-8 h-8 dark:text-white' /></Button>
    </Form>
}