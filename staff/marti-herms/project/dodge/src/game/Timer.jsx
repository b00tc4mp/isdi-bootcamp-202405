import { useEffect } from 'react'

import { TIME } from '../../util/constants.js'

export default function Timer({ pause, seconds, setSeconds, setEnd }) {
    useEffect(() => {
        let intervalId = null

        if (!pause && TIME >= (seconds * 1000)) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)
        } else if (pause && seconds !== 0) {
            clearInterval(intervalId)
        } else if (TIME <= (seconds * 1000)) {
            clearInterval(intervalId)
            setEnd(true)
        }

        return () => clearInterval(intervalId)
    }, [pause, seconds])

    return <div className='text-white text-lg'>{seconds}</div>
} 