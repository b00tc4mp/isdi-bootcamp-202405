import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function Alert({ message, onAccept }) {


    return <Container className="flex items-center justify-center fixed h-screen w-screen bg-black opacity-50 top-0">
        <Container className="bg-[#ff4cad] p-2 text-white">
            <Paragraph>
                {message}
            </Paragraph>
            <Button className="border-black " onClick={onAccept}>Accept</Button>
        </Container>
    </Container >
}