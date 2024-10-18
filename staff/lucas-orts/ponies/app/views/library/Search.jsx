import { useSearchParams } from "react-router-dom";

import Form from "./Form"
import Label from "./Label"
import Input from "./Input"
import Button from "./Button"

export default () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q')

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const q = form.q.value

        setSearchParams({ q })
    }

    return <Form onSubmit={handleSubmit}>
        <Label>Criteria</Label>
        <Input name="q" placeholder="query" defaultValue={q} />
        <Button type="submit">Search</Button>
    </Form>
}