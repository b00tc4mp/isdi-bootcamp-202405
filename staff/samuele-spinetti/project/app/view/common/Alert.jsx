import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function Alert({ message, onAccept }) {
    return <>
        <Container className="fixed w-screen top-0 left-0 h-screen bg-black opacity-70 z-40"></Container>


        <Container className="fixed w-screen top-0 left-0 h-screen flex items-center justify-center z-50">
            <Container className="p-6 border shadow-lg bg-white flex-col h-auto w-72 flex items-center justify-center gap-5 rounded-xl">
                <Paragraph className="text-xl font-semibold text-gray-800 text-center">{message}</Paragraph>
                <Button
                    className="bg-gradient-to-br from-green-400 to-fuchsia-500 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={onAccept}>
                    Accept
                </Button>
            </Container>
        </Container>
    </>
} 