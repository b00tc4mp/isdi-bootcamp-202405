import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'

export default function Alert({ message, onAccept }) {
    return <>
        <Container></Container>

        <Container>
            <Container>
                <Paragraph>{message}</Paragraph>
                <Button onClick={onAccept}>accept</Button>
            </Container>
        </Container>
    </>
}