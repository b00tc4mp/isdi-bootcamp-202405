import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

    const handleSubmit = event => {
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

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }

    return <Form className='mt-5 gap-[.2rem]' onSubmit={handleSubmit}>
        <Input name='q' placeholder='search' value={query} onChange={handleInputChange} />
        <Button type='submit' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold mb-2'>SEARCH</Button>
    </Form>

}