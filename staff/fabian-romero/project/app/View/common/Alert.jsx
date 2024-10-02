import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'

export default function Alert({ message, onAccept }) {
    return <>
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-50">
        </Container>

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">

            <Container
                className="p-4 border bg-white text-black flex-col">
                <Paragraph>{message} ⚡️ </Paragraph>
                <Button onClick={onAccept}>Accept</Button>
            </Container>

        </Container>
    </>
}