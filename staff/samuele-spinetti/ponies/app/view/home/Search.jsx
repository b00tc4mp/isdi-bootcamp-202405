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
        <section className="search-post-section">

            <Heading level="2" className={"search-post-section__title"}>Search Post</Heading>

            <Form className={"form"} onSubmit={handleSearchPostSubmit}>
                <Container className={"form__field"}>
                    <Label htmlFor={"search-input"}></Label>
                    <Input name={"q"} className={"form__input"} id={"search-input"} type={"text"} placeholder={"Search"} defaultValue={query} value={query} onChange={handleInputChange} />
                </Container>

                <Container className={"search-section__buttons"}>
                    <Button className={"form__button"} type={"submit"}>Search</Button>
                    <Button className={"form__button"} type={"reset"} onClick={handleCancelSearchPostClick}>Cancel</Button>
                </Container>

            </Form>
        </section>
    </>
}