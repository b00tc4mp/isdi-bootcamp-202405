import Container from '../library/Container'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'

export default function Alert({ message, onAccept }) {
    return <>
        <Container className='fixed w-screen top-0 h-screen bg-black opacity-50'>
        </Container>

        <Container className='fixed w-screen top-0 h-screen flex items-center justify-center'>
            <Container className='p-4 border bg-white dark:bg-black dark:text-white flex-col'>
                <Paragraph>{message}</Paragraph>
                <Button onClick={onAccept}>Accept</Button>
            </Container>
        </Container>
    </>
}