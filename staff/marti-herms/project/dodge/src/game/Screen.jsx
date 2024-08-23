import { useEffect, useState } from 'react'

import Container from '../library/Container'

import Player from './Player'
import Controller from './Controller'
import Obstacle from './Obstacle'

import randomNumberGenerator from '../../util/randomNumberGenerator.js'
import { SPAWN_RATE } from '../../util/constants.js'


let obstacleCount = 0

export default function Screen({ pause, end, setEnd }) {
    const [position, setPosition] = useState({ top: window.innerHeight / 2 - 25, left: window.innerWidth / 2 - 25 })
    const [obstacles, setObstacles] = useState([])
    const [intervalId, setIntervalId] = useState(null)

    useEffect(() => {
        if (pause || end) {
            clearInterval(intervalId)
        } else if (!pause && !end) {
            handleSpawn()
        }
    }, [pause, end])

    const handleOutOfBounds = (obstacle) => {
        const newArray = obstacles.filter(_obstacle => _obstacle.id !== obstacle.id)

        setObstacles(newArray)
    }

    const clearField = () => {
        setObstacles([])
    }

    const handleSpawn = () => {
        setIntervalId(setInterval(() => {
            const side = randomNumberGenerator(1, 4)
            let x, y
            switch (side) {
                case 1:
                    x = randomNumberGenerator(50, 700)
                    y = 50
                    break
                case 2:
                    x = 50
                    y = randomNumberGenerator(50, 300)
                    break
                case 3:
                    x = 700
                    y = randomNumberGenerator(50, 300)
                    break
                case 4:
                    x = randomNumberGenerator(50, 700)
                    y = 300
                    break
                default:
                    break
            }

            setObstacles(prev => ([...prev, { top: y, left: x, id: obstacleCount++ }]))
        }, SPAWN_RATE))
    }

    return <Container className='h-full w-full'>
        {obstacles.map(obstacle =>
            <Obstacle
                key={obstacle.id}
                playerPosition={position}
                obstacle={obstacle}
                pause={pause}
                onOutOfBounds={handleOutOfBounds}
                setEnd={setEnd}
                clearField={clearField} />)}
        <Player position={position} />
        <Controller position={position} setPosition={setPosition} />
    </Container>
}