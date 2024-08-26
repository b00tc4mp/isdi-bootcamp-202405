import { useEffect } from 'react'
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa'

import Container from '../library/Container'
import Button from '../library/Button'

import logic from '../../logic'

export default function Controller({ setPlayer, pause, end }) {
    useEffect(() => {
        if (!pause && !end) {
            window.addEventListener('keydown', handleMovement)

            return () => window.removeEventListener('keydown', handleMovement)
        } else if (end) {
            logic.clearPlayer()
        }
    }, [pause, end])

    const handleMovement = (event) => {
        logic.movePlayer(event)

        const player = logic.getPlayer()

        setPlayer(prev => ({ ...prev, top: player.top, left: player.left }))
    }

    const handleUp = () => {
        handleMovement('up')
    }

    const handleLeft = () => {
        handleMovement('left')
    }

    const handleRight = () => {
        handleMovement('right')
    }

    const handleDown = () => {
        handleMovement('down')
    }

    return <Container className='absolute bottom-4 left-4 w-[100px] aspect-square grid grid-cols-3 grid-rows-3'>
        <Button onClick={handleUp} className='w-full rounded-t-lg aspect-square border border-solid border-white col-start-2 row-start-1'><FaArrowUp className='w-full h-full text-white' /></Button>
        <Button onClick={handleLeft} className='w-full rounded-l-lg aspect-square border border-solid border-white col-start-1 row-start-2'><FaArrowLeft className='w-full h-full text-white' /></Button>
        <Button onClick={handleRight} className='w-full rounded-r-lg aspect-square border border-solid border-white col-start-3 row-start-2'><FaArrowRight className='w-full h-full text-white' /></Button>
        <Button onClick={handleDown} className='w-full rounded-b-lg aspect-square border border-solid border-white col-start-2 row-start-3'><FaArrowDown className='w-full h-full text-white' /></Button>
    </Container>
}