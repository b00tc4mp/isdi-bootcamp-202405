import { useParams } from 'react-router-dom'

export default () => {
    const { to } = useParams()

    return <h1>Hello, {to}!</h1>
}