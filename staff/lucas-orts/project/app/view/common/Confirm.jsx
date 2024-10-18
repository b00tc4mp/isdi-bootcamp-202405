import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Image from '../library/Image'

export default function Confirm({ message, onAccept, onCancel }) {
    return <>
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 items-center bg-black opacity-50 z-30' />
        <Container className='fixed w-screen top-0 bottom-0 h-screen left-0 right-0 flex items-center justify-center z-40'>
            <Container className='p-6 border bg-white rounded-lg shadow-lg flex-col items-center justify-center space-y-6'>
                <Paragraph className='font-semibold mb-2 text-center'>{message}</Paragraph>
                <Container className='flex items-center'>
                    <Button onClick={onCancel}><Image src='/icons/close-circle-outline.svg' alt='cancel icon' className='h-[30px] w-[30px]' /></Button>
                    <Button onClick={onAccept}><Image src='/icons/checkmark-circle-outline.svg' alt='accept icon' className='h-[30px] w-[30px]' /></Button>
                </Container>
            </Container>
        </Container>
    </>
}