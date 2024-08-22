import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Span from '../library/Span'

export default function Alert({ message, onAccept }) {
    return <>
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-60"></Container>

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white flex-col h-52 w-52 flex items-center justify-center gap-5 rounded-xl">
                <Paragraph className="text-lg">{message}</Paragraph>
                <Button className="border w-20 h-10 border-gray-300 bg-white rounded-lg" onClick={onAccept}>Accept</Button>
            </Container>
        </Container>
    </>
} 