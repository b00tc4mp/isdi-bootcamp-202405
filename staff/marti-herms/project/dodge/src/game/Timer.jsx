import { useEffect, useState } from 'react'

import logic from '../../logic/index.js'

export default function Timer({ pause, end }) {
    const [seconds, setSeconds] = useState(0)
    const [points, setPoints] = useState(0)

    useEffect(() => {
        let intervalId = null

        try {
            if (!pause && !end) {
                intervalId = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds + 1)
                }, 1000)
            } else if (pause && seconds !== 0) {
                clearInterval(intervalId)
            } else if (end) {
                setSeconds(0)
                setPoints(logic.getPoints())
                clearInterval(intervalId)
            }

            return () => clearInterval(intervalId)
        } catch (error) {
            console.error
        }
    }, [pause, end])

    useEffect(() => {
        try {
            logic.setPoints(seconds)

            setPoints(logic.getPoints())
        } catch (error) {
            console.error(error)
        }
    }, [seconds])

    return <>
        <p className='text-white'>Points: {points}</p>
        <div className='text-white'>Time: {seconds}</div>
    </>
} 