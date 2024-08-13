import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Span from '../library/Span'

export default function Alert({ message, onAccept }) {

    return <>
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-50"></Container>

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white flex-col w-[10rem] h-[10rem]  flex items-center justify-center gap-5 rounded-xl">
                <Paragraph className="font-semibold">{message}</Paragraph>
                <Button className="border border-black rounded-xl w-24 h-10 bg-gradient-to-br from-green-400 to-fuchsia-500" onClick={onAccept}><Span className="text-white">Accept</Span></Button>
            </Container>
        </Container>
    </>
} 