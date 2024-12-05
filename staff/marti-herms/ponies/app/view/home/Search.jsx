import { useSearchParams } from 'react-router-dom'

import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Container from '../library/Container'

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const q = form.q.value

        setSearchParams({ q })
    }

    return <Container className='flex-col justify-center'>
        <Form className='flex-col' onSubmit={handleSubmit}>
            <Label htmlFor='query'>Criteria</Label>
            <Input name='q' placeholder='query' id='query' defaultValue={q} />
            <Button type='submit'>Search</Button>
        </Form >
    </ Container>
}