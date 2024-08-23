import { useEffect, useState } from 'react'

import Container from '../library/Container'

import { OBS_PACE, OBS_RATE, OBS_SIZE, PLAYER_SIZE } from '../../util/constants.js'

export default function Obstacle({ playerPosition, obstacle, pause, onOutOfBounds, setEnd, clearField }) {
    const [obstaclePosition, setObstaclePosition] = useState({ top: obstacle.top, left: obstacle.left })
    const [intervalId, setIntervalId] = useState(null)
    const [moveY] = useState(playerPosition.top - obstaclePosition.top)
    const [moveX] = useState(playerPosition.left - obstaclePosition.left)

    const obsTop = obstaclePosition.top
    const obsLeft = obstaclePosition.left
    const obsRight = obstaclePosition.left + OBS_SIZE
    const obsBottom = obstaclePosition.top + OBS_SIZE

    const playerTop = playerPosition.top
    const playerLeft = playerPosition.left
    const playerRight = playerPosition.left + PLAYER_SIZE
    const playerBottom = playerPosition.top + PLAYER_SIZE

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
        if (obsTop > playerTop && obsTop < playerBottom && obsLeft > playerLeft && obsLeft < playerRight ||
            obsBottom > playerTop && obsBottom < playerBottom && obsLeft > playerLeft && obsLeft < playerRight ||
            obsTop > playerTop && obsTop < playerBottom && obsRight > playerLeft && obsRight < playerRight ||
            obsBottom > playerTop && obsBottom < playerBottom && obsRight > playerLeft && obsRight < playerRight) {
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
                    top: moveY > 0 ? prev.top + Math.floor(OBS_PACE * (1 / modifier)) : prev.top - Math.floor(OBS_PACE * (1 / modifier)),
                    left: moveX > 0 ? prev.left + Math.floor(OBS_PACE * (1 - (1 / modifier))) : prev.left - Math.floor(OBS_PACE * (1 - (1 / modifier)))
                })) :
                setObstaclePosition(prev => ({
                    top: moveY > 0 ? prev.top + Math.floor(OBS_PACE * (1 - modifier)) : prev.top - Math.floor(OBS_PACE * (1 - modifier)),
                    left: moveX > 0 ? prev.left + Math.floor(OBS_PACE * modifier) : prev.left - Math.floor(OBS_PACE * modifier)
                }))
        }, OBS_RATE))
    }

    return <Container className={`absolute bg-red-500 w-[${OBS_SIZE}px] aspect-square text-white text-4xl`} style={{ top: `${obstaclePosition.top}px`, left: `${obstaclePosition.left}px` }}>{obstacle.id}</Container>
}