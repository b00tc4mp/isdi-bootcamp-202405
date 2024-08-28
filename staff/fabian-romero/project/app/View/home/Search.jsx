import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

export default function Search({ onUnsearchPost }) {
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

        if (!query.trim()) {
            navigate('/search')
        } else if (location.pathname !== '/search') {
            navigate(`/search?q=${query}`)
        } else {
            setSearchParams({ q: query })
        }

        setQuery(query)
    }

    const handleInputChange = (event) => {
        const { value: query } = event.target
        setQuery(query)
    }

    const handleUnsearchPostClick = () => {
        console.debug('Search -> handleUnsearchPostClick')
        onUnsearchPost()
    }

    return <Form onSubmit={handleSubmit} className="flex justify-center items-center text-black text-xxs">
        <div className="relative">
            <Input
                id="inputfield"
                className="peer bg-transparent h-6 w-18 rounded text-gray-600 placeholder-transparent ring-1 px-1 ring-gray-500 focus:w-26 focus:ring-sky-600 outline-none transition-all duration-300"
                name="q"
                placeholder="search"
                value={query}
                onChange={handleInputChange}
            />
            <label
                htmlFor="inputfield"
                className="absolute cursor-text left-0 -top-5 text-xxxs text-gray-500 bg-inherit mx-0.5 px-0.5 peer-placeholder-shown:text-xxs peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-1 peer-focus:-top-5
                peer-focus:text-sky-600 peer-focus:text-xxs transition-all"
            >
                Search
            </label>
        </div>

        <Button type="submit" className="mx-1">
            ✅
        </Button>
        <Button type="button" className="mx-1" onClick={handleUnsearchPostClick}>
            ｘ
        </Button>
    </Form>

}