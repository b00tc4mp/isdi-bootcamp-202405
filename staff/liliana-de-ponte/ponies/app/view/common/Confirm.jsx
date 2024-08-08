import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        {/* capa que difumina el fondo */}
        <Container className="flex items-center justify-center fixed h-screen bg-black opacity-50">
        </Container >

        <Container className="flex items-center justify-center fixed h-screen bg-black opacity-50 top-0">
            <Container className="bg-white dark:bg-pink-900 p-2 dark:text white">
                <Paragraph>{message}</Paragraph>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onAccept}>Accept</Button>
            </Container>
        </Container>
    </>
}