import { useEffect } from 'react'
import Container from '../library/Container'
import Button from '../library/Button'

export default function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    if (!isOpen) return null

    return <Container className='fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50 z-50'>
        <Container className='bg-slate-600 rounded-lg shadow-lg p-4 w-[90%] h-[90%]'>
            <Button onClick={onClose} className='absolute top-2 right-2 text-xl'>
                ✕
            </Button>
            {children}
        </Container>
    </Container>

}