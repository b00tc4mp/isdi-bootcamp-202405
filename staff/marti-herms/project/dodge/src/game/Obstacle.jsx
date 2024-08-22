import { useEffect, useState } from 'react'

import Container from '../library/Container'

const OBS_SPEED = 20

export default function Obstacle({ playerPosition, obstacle, pause, onOutOfBounds }) {
    const [obstaclePosition, setObstaclePosition] = useState({ top: obstacle.top, left: obstacle.left })
    const [intervalId, setIntervalId] = useState(null)
    const [moveY] = useState(playerPosition.top - obstaclePosition.top)
    const [moveX] = useState(playerPosition.left - obstaclePosition.left)

    const modifier = Math.abs(moveX) / Math.abs(moveY)

    useEffect(() => {
        if (pause)
            clearInterval(intervalId)
        else
            handleMovement()
    }, [pause])

    useEffect(() => {
        if (obstaclePosition.top >= window.innerHeight - 50 || obstaclePosition.top < 10 || obstaclePosition.left >= window.innerWidth - 50 || obstaclePosition.left < 10) {
            obstacle.top = obstaclePosition.top
            obstacle.left = obstaclePosition.left
            onOutOfBounds(obstacle)
        }
    }, [obstaclePosition])

    const handleMovement = () => {
        if (intervalId)
            clearInterval(intervalId)

        setIntervalId(setInterval(() => {
            modifier >= 1 ?
                setObstaclePosition(prev => ({
                    top: moveY > 0 ? prev.top + Math.floor(OBS_SPEED * (1 / modifier)) : prev.top - Math.floor(OBS_SPEED * (1 / modifier)),
                    left: moveX > 0 ? prev.left + Math.floor(OBS_SPEED * (1 - (1 / modifier))) : prev.left - Math.floor(OBS_SPEED * (1 - (1 / modifier)))
                })) :
                setObstaclePosition(prev => ({
                    top: moveY > 0 ? prev.top + Math.floor(OBS_SPEED * (1 - modifier)) : prev.top - Math.floor(OBS_SPEED * (1 - modifier)),
                    left: moveX > 0 ? prev.left + Math.floor(OBS_SPEED * modifier) : prev.left - Math.floor(OBS_SPEED * modifier)
                }))
        }, 100))
    }

    return <Container className='absolute bg-red-500 w-[50px] aspect-square text-white text-4xl' style={{ top: `${obstaclePosition.top}px`, left: `${obstaclePosition.left}px` }}>{obstacle.id}</Container>
}