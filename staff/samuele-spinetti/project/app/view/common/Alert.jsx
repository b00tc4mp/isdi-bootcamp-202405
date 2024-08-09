import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function Alert({ message, onAccept }) {

    return <>
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-60"></Container>

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white flex-col">
                <Paragraph>{message}</Paragraph>
                <Button className="border-black" onClick={onAccept}>Accept</Button>
            </Container>
        </Container>
    </>
}