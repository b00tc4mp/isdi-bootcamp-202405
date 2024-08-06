import { useSearchParams } from 'react-router-dom'

import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Container from '../components/Container'

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const q = form.q.value

        setSearchParams({ q })
    }

    return <Container className='Container--center-column'>
        <Form className='Form--column' onSubmit={handleSubmit}>
            <Label htmlFor='query'>Criteria</Label>
            <Input name='q' placeholder='query' id='query' defaultValue={q} />
            <Button type='submit'>Search</Button>
        </Form >
    </ Container>
}