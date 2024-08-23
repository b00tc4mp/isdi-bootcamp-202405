import { useEffect, useState } from 'react'

import Container from '../library/Container'

import { OBS_SPEED, OBS_SIZE, PLAYER_SIZE } from '../../util/constants.js'

export default function Obstacle({ playerPosition, obstacle, pause, onOutOfBounds, setEnd, clearField }) {
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
        if (obstaclePosition.top >= window.innerHeight - OBS_SIZE - 10 || obstaclePosition.top < 0 || obstaclePosition.left >= window.innerWidth - OBS_SIZE - 10 || obstaclePosition.left < 0) {
            obstacle.top = obstaclePosition.top
            obstacle.left = obstaclePosition.left
            onOutOfBounds(obstacle)
        }
    }, [obstaclePosition])

    useEffect(() => {
        if (obstaclePosition.top < playerPosition.top + PLAYER_SIZE && obstaclePosition.top > playerPosition.top ||
            obstaclePosition.top + OBS_SIZE < playerPosition.top + PLAYER_SIZE && obstaclePosition.top + OBS_SIZE > playerPosition.top ||
            obstaclePosition.left < playerPosition.left + PLAYER_SIZE && obstaclePosition.left > playerPosition.left ||
            obstaclePosition.left + OBS_SIZE < playerPosition.left + PLAYER_SIZE && obstaclePosition.left + OBS_SIZE > playerPosition.left) {
            setEnd(true)
            clearField()
        }
    }, [obstaclePosition, playerPosition])

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
        }, 300))
    }

    return <Container className={`absolute bg-red-500 w-[${OBS_SIZE}px] aspect-square text-white text-4xl`} style={{ top: `${obstaclePosition.top}px`, left: `${obstaclePosition.left}px` }}>{obstacle.id}</Container>
}