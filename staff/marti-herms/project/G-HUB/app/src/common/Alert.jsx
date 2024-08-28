import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'

export default function Alert({ message, onAccept }) {
    return <>
        <Container className='absolute w-screen top-5 left-0 h-auto flex items-center justify-center z-50'>
            <Container className='p-4 border bg-red-400 dark:bg-red-900 dark:text-white flex flex-col'>
                <Paragraph>{message}</Paragraph>
                <Button className='self-end mr-2 dark:text-white' onClick={onAccept}>Accept</Button>
            </Container>
        </Container>
    </>
}