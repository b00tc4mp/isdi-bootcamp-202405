import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container className="fixed w-screen top-0 left-0 h-screen bg-[#050968] opacity-70 z-40">
        </Container >

        <Container className="fixed w-screen top-0 left-0 h-screen flex items-center justify-center z-50">
            <Container className="p-4 border-4 border-[#050968] bg-[#FFEBF4] h-auto w-72 flex-col flex items-center justify-center gap-5 rounded-xl">
                <Paragraph className="font-semibold text-xl text-[#050968]">{message}</Paragraph>
                <Button className="border rounded-xl w-28 h-10 bg-[#050968]" onClick={onCancel}>Cancel</Button>
                <Button className="border rounded-xl w-28 h-10 bg-[#050968]" onClick={onAccept}>Accept</Button>
            </Container>
        </Container >
    </>
}