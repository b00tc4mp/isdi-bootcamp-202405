import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Lottie from 'lottie-react'
import CheckIconAnimation from '../../public/CheckIcon.json'
import CrossIconAnimation from '../../public/CrossIcon.json'


export default function Search({ onUnsearchPost, onSearchFound }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')
    const [isLooping, setIsLooping] = useState(false)

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

        onSearchFound()
    }

    const handleInputChange = (event) => {
        const { value: query } = event.target
        setQuery(query)
    }

    const handleUnsearchPostClick = () => {
        console.debug('Search -> handleUnsearchPostClick')
        onUnsearchPost()
    }

    const handleMouseEnter = () => {
        setIsLooping(true)
    }

    const handleMouseLeave = () => {
        setIsLooping(false)
    }

    return <Form onSubmit={handleSubmit} className="flex justify-center  bg-cyan-800 h-full  items-center text-black text-xxs">
        <div className="relative">
            <Input
                id="inputfield"
                className="peer bg-transparent h-6 w-18 rounded text-orange-600 placeholder-transparent ring-1 px-1 ring-gray-500 focus:w-26 focus:ring-sky-600 outline-none transition-all duration-300"
                name="q"
                placeholder="search"
                value={query}
                onChange={handleInputChange}
            />
            <label
                htmlFor="inputfield"
                className="absolute cursor-text left-0 -top-5 text-xxxs text-orange-400 bg-inherit mx-0.5 px-0.5 peer-placeholder-shown:text-xxs peer-placeholder-shown:text-orange-600 peer-placeholder-shown:-top-0 peer-focus:-top-5
                peer-focus:text-orange-300 peer-focus:text-xxs transition-all"
            >
                Search
            </label>
        </div>

        <Button
            type="submit"
            className="w-8 h-8 flex items-center justify-center bg-transparent transition-transform transform hover:scale-95"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Lottie animationData={CheckIconAnimation} loop={isLooping} className="w-full h-full" />
        </Button>

        <Button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-transparent transition-transform transform hover:scale-95"
            onClick={handleUnsearchPostClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Lottie animationData={CrossIconAnimation} loop={isLooping} className="w-full h-full" />
        </Button>
    </Form>

}