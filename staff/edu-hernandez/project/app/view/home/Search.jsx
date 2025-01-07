import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Input from '../library/Input'
import { FaSearch } from 'react-icons/fa'

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


    return <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark_white" />
            <Input
                name="q"
                placeholder="search events.."
                value={query}
                onChange={handleInputChange}
                className="w-full pl-12 pr-24 py-2 border-2 border-gray-300 rounded-lg bg-transparent outline-none text-light_grey" />
        </div>
    </form>
}