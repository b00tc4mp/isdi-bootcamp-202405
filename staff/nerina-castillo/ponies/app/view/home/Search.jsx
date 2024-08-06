import { useSearchParams } from 'react-router-dom'

import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'

export default () => {
    const [searchParams, setSeachParams] = useSearchParams()

    const q = searchParams.get('q')

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const q = form.q.value

        setSeachParams({ q })
    }

    return <Form onSubmit={handleSubmit}>
        <Label>Criteria</Label>
        <Input name="q" placeholder="query" defaultValue={q} />
        <Button type="submit">Search</Button>
    </Form>
}