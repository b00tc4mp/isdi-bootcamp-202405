import Container from '../library/Container'
import Button from '../library/Button'

export default function Alert({ message, onAccept }) {
    return <>
        <Container classname="fixed flex  w-screen h-screen bg-black opacity-50">
        </Container>

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white dark:bg-black dark:text-white flex-col">
                <p>{message}</p>
                <Button onClick={onAccept}>Accept</Button>
            </Container>
        </Container >
    </>
}