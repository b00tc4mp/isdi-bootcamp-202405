import { useEffect } from 'react'
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa'

import Container from '../library/Container'
import Button from '../library/Button'

export default function Controller({ position, setPosition }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [position])

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                handleUp()
                break
            case 'ArrowLeft':
            case 'a':
                handleLeft()
                break
            case 'ArrowRight':
            case 'd':
                handleRight()
                break
            case 'ArrowDown':
            case 's':
                handleDown()
                break
            default:
                break
        }
    }

    const handleUp = () => {
        setPosition({ top: Math.max(0, position.top - 10), left: position.left })
    }

    const handleLeft = () => {
        setPosition({ top: position.top, left: Math.max(0, position.left - 10) })
    }

    const handleRight = () => {
        setPosition({ top: position.top, left: Math.min(window.innerWidth - 25, position.left + 10) })
    }

    const handleDown = () => {
        setPosition({ top: Math.min(window.innerHeight - 25, position.top + 10), left: position.left })

    }

    return <Container className='absolute bottom-4 left-4 w-[100px] aspect-square grid grid-cols-3 grid-rows-3'>
        <Button onClick={handleUp} className='w-full rounded-t-lg aspect-square border border-solid border-white col-start-2 row-start-1'><FaArrowUp className='w-full h-full text-white' /></Button>
        <Button onClick={handleLeft} className='w-full rounded-l-lg aspect-square border border-solid border-white col-start-1 row-start-2'><FaArrowLeft className='w-full h-full text-white' /></Button>
        <Button onClick={handleRight} className='w-full rounded-r-lg aspect-square border border-solid border-white col-start-3 row-start-2'><FaArrowRight className='w-full h-full text-white' /></Button>
        <Button onClick={handleDown} className='w-full rounded-b-lg aspect-square border border-solid border-white col-start-2 row-start-3'><FaArrowDown className='w-full h-full text-white' /></Button>
    </Container>
}