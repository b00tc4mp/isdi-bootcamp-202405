import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Image from '../library/Image'

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

    return <Container className='mt-[60px]'>
        <Heading className='mt-2 ml-2 text-2xl font-bold'>search</Heading>
        <Form className='mt-[36px] gap-[.2rem]' onSubmit={handleSubmit}>
            <Container className='flex flex-row gap-2 justify-between'>
                <Input name='q' placeholder='search' className='w-full' value={query} onChange={handleInputChange} />
                <Button type='submit' className='ml-2'>
                    <Image className='w-[25px] h-[20px]' src='./search.png' />
                </Button>
            </Container>
        </Form>
    </Container >
}