import Button from '../library/Button'
import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-60"></Container>

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white flex-col">
                <Paragraph>{message}</Paragraph>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onAccept}>Ok</Button>
            </Container>
        </Container>
    </>
}