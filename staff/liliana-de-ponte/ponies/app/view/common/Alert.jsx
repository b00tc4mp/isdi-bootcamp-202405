import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function Alert({ message, onAccept }) {
    return <>
        {/* capa que difumina el fondo */}
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-50">
        </Container >

        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="bg-[#F981FB]   dark:bg-pink-900 p-4 border dark:text-white">
                <Paragraph>{message}</Paragraph>
                <Button className="bg-[#F981FB]  dark:bg-pink-900 rounded-[8px] border-[f7bff8]" onClick={onAccept}>Accept</Button>
            </Container>
        </Container>
    </>
}