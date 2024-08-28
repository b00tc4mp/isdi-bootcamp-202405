import { useEffect } from 'react'

import Container from '../library/Container'

import logic from '../../logic/index.js'

export default function Obstacle({ player, obstacle, onOutOfBounds, setEnd }) {
    useEffect(() => {
        try {
            if (logic.checkOutOfBounds(obstacle.id)) {
                onOutOfBounds(obstacle.id)
            }
        } catch (error) {
            console.error(error)
        }
    }, [obstacle.top, obstacle.left])

    useEffect(() => {
        if (logic.checkCollision())
            setEnd(true)
    }, [obstacle.top, obstacle.left, player.top, player.left])

    return <Container className='absolute aspect-square text-white text-2xl' style={{ top: `${obstacle.top}px`, left: `${obstacle.left}px`, width: `${obstacle.width}px`, height: `${obstacle.height}px`, backgroundColor: obstacle.color }}>{obstacle.id}</Container>
}