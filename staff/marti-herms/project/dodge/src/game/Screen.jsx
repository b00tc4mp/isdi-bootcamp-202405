import { useEffect, useState } from 'react'

import Container from '../library/Container'

import Player from './Player'
import Controller from './Controller'
import Obstacle from './Obstacle'

import randomNumberGenerator from '../../util/randomNumberGenerator.js'

export default function Screen({ pause }) {
    const [position, setPosition] = useState({ top: window.innerHeight / 2 - 25, left: window.innerWidth / 2 - 25 })
    const [obstacles, setObstacles] = useState([])
    let obstacleCount = 0

    useEffect(() => {
        const intervalId = setInterval(() => {
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
        }, 500)

        const timeoutId = setTimeout(() => clearInterval(intervalId), 2000)
    }, [])

    const handleOutOfBounds = (obstacle) => {
        const newArray = obstacles.filter(_obstacle => _obstacle.id !== obstacle.id)

        setObstacles(newArray)
    }

    return <Container className='h-full w-full'>
        {obstacles.map(obstacle => <Obstacle key={obstacle.id} playerPosition={position} obstacle={obstacle} pause={pause} onOutOfBounds={handleOutOfBounds} />)}
        <Player position={position} />
        <Controller position={position} setPosition={setPosition} />
    </Container>
}