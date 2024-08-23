import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container className='fixed w-screen top-0 left-0 h-screen bg-slate-300 opacity-60'></Container>

        <Container className='fixed w-screen top-0 left-0 h-screen flex items-center justify-center'>
            <Container className='p-4 border bg-slate-600 flex-col h-52 flex items-center gap-5 rounded-xl'>
                <Paragraph className='text-lg'>{message}</Paragraph>
                <Button className='border w-20 h-10 border-slate-300 bg-slate-600 rounded-lg' onClick={onCancel}>cancel</Button>
                <Button className='border w-20 h-10 border-slate-300 bg-slate-600 rounded-lg' onClick={onAccept}>ok</Button>
            </Container>
        </Container>
    </>
}