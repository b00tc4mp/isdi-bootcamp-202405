import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Container from '../components/Container'

export default function Search({ onCancelSearchPost, onPostSearched }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSeachParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''

    useEffect(() => {
        if (q)
            setQuery(q)
    }, [q])

    const handleSearchPostSubmit = event => {
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

        onPostSearched()
    }

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }

    const handleCancelSearchPostClick = () => onCancelSearchPost()

    return <>
        <section className="fixed bottom-0 left-0 w-full bg-[#ff4cad] p-2 box-border rounded-[25px_25px_0_0]">

            <Heading level="2" className={"m-[0.5rem_0] text-center"}>Search Post</Heading>

            <Form className={"flex flex-col gap-1 min-w-[80%]"} onSubmit={handleSearchPostSubmit}>
                <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                    <Label htmlFor={"search-input"}></Label>
                    <Input name={"q"} className={"text-inherit rounded-[20px] border-white"} id={"search-input"} type={"text"} placeholder={"Search"} defaultValue={query} value={query} onChange={handleInputChange} />
                </Container>

                <Container className={"flex justify-around"}>
                    <Button className={"text-inherit rounded-[20px] bg-[#ffd4ff] border-white"} type={"submit"}>Search</Button>
                    <Button className={"text-inherit rounded-[20px] bg-[#ffd4ff] border-white"} type={"reset"} onClick={handleCancelSearchPostClick}>Cancel</Button>
                </Container>

            </Form>
        </section>
    </>
}