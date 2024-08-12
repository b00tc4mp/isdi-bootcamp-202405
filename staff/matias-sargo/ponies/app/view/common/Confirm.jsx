import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-50">
        </Container>

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white dark:bg-black dark:text-white flex-col">
                <Paragraph>{message}</Paragraph>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onAccept}>Ok</Button>
            </Container>
        </Container>
    </>
}