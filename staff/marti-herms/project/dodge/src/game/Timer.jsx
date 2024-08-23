import { useEffect } from 'react'

import { TIME } from '../../util/constants.js'

export default function Timer({ pause, seconds, setSeconds, end }) {
    useEffect(() => {
        let intervalId = null

        if (!pause && !end) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)
        } else if (pause && seconds !== 0) {
            clearInterval(intervalId)
        } else if (end) {
            clearInterval(intervalId)
        }

        return () => clearInterval(intervalId)
    }, [pause, seconds, end])

    return <div className='text-white'>Time: {seconds}</div>
} 