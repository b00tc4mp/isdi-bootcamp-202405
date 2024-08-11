import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container></Container>

        <Container>
            <Container>
                <Paragraph>{message}</Paragraph>
                <Button onClick={onCancel}>cancel</Button>
                <Button onClick={onAccept}>ok</Button>
            </Container>
        </Container>
    </>
}