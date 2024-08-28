import { useEffect, useState } from 'react'

import Obstacle from './Obstacle'

import logic from '../../logic'

import { SPAWN_RATE, OBS_RATE } from '../../util/constants.js'

let obstacleCount = 0

export default function Obstacles({ player, pause, end, setEnd }) {
    const [obstacles, setObstacles] = useState([])
    const [spawnIntervalId, setSpawnIntervalId] = useState(null)
    const [movementIntervalId, setMovementIntervalId] = useState(null)

    useEffect(() => {
        if (end) {
            clearInterval(spawnIntervalId)
            clearInterval(movementIntervalId)
            clearField()
            obstacleCount = 0
        } else if (pause) {
            clearInterval(spawnIntervalId)
            clearInterval(movementIntervalId)
        } else {
            handleSpawn()
            handleMovement()
        }
    }, [pause, end])

    const handleSpawn = () => {
        setSpawnIntervalId(setInterval(() => {
            logic.createObstacle(obstacleCount++)

            const items = logic.getObstacles()

            setObstacles(() => ([...items]))
        }, SPAWN_RATE))
    }

    const handleMovement = () => {
        if (movementIntervalId)
            clearInterval(movementIntervalId)

        setMovementIntervalId(setInterval(() => {
            logic.moveObstacles()

            const items = logic.getObstacles()

            setObstacles(() => ([...items]))
        }, OBS_RATE))
    }

    const handleOutOfBounds = (id) => {
        logic.removeObstacle(id)

        const items = logic.getObstacles()

        setObstacles(() => [...items])
    }

    const clearField = () => {
        clearInterval(spawnIntervalId)
        logic.clearObstacles()
        setObstacles([])
    }

    return <>
        {obstacles.map(obstacle =>
            <Obstacle
                key={obstacle.id}
                player={player}
                obstacle={obstacle}
                onOutOfBounds={handleOutOfBounds}
                setEnd={setEnd} />)}
    </>
}