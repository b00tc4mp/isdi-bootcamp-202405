import Button from '../library/Button'
import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container className="fixed w-screen top-0 left-0 h-screen bg-black opacity-60"></Container>

        <Container className="fixed w-screen top-0 left-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white h-52 w-52 rounded-xl flex flex-col justify-center items-center">
                <Paragraph className="text-base font-semibold">{message}</Paragraph>
                <br />
                <Container className="flex flox-row gap-5">
                    <Button className="border w-20 h-10 border-gray-300 bg-white rounded-lg" onClick={onAccept}>Accept</Button>
                    <Button className="border w-20 h-10 border-gray-300 bg-white rounded-lg" onClick={onCancel}>Cancel</Button>
                </Container>
            </Container>
        </Container>
    </>
}