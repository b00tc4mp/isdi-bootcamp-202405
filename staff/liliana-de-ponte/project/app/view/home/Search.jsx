import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5"

import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Container from '../library/Container'

export default function Search() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''
    const distance = searchParams.get('distance') || '10'

    useEffect(() => {
        if (q)
            setQuery(q, distance)
    }, [q, distance])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { value: query } = form.q
        const { value: distance } = form.distance

        if (!query.trim())
            navigate(`/search?q=${query}&distance=${distance}`)
        else if (location.pathname !== '/search')
            navigate('/search')
        else
            setSearchParams({ q: query, distance })

        setQuery(query)
    }

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }

    return <>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Container className="flex flex-col gap-0 p-0">
                    <Container className="flex justify-between w-full">
                        <span className="text-[#FFEBF4] text-xs">0</span>
                        <span className="text-[#FFEBF4] text-xs">2.5</span>
                        <span className="text-[#FFEBF4] text-xs">5</span>
                        <span className="text-[#FFEBF4] text-xs">7.5</span>
                        <span className="text-[#FFEBF4] text-xs" >10</span>
                    </Container>
                    <Input className="w-full slider" type='range' min='0' max='10' step="2.5" defaultValue="0" name='distance' />
                </Container>

                <Container className="flex flex-row items-center" >
                    <Input name="q" placeholder="Search" value={query} onChange={handleInputChange} />
                    <Button className="font-serif h-[30px] rounded-[8px] border-[f7bff8]" type="submit"><IoSearchSharp /></Button>
                </Container>

            </Form >
        </Container >
    </>

}