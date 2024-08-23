import { useState, useEffect } from 'react'

import Button from '../library/Button'

import Screen from './Screen'
import Timer from './Timer'
import PauseMenu from './PauseMenu'
import GameOver from './GameOver'

export default function Game({ username, onHomeClick }) {
    const [pause, setPause] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [points, setPoints] = useState(0)
    const [end, setEnd] = useState(false)

    useEffect(() => {
        if (seconds === 0)
            setPoints(0)
        else if (seconds < 20)
            setPoints(prev => (prev + 1))
        else if (seconds < 30)
            setPoints(prev => (prev + 5))
        else if (seconds < 60)
            setPoints(prev => (prev + 10))
        else if (seconds < 120)
            setPoints(prev => (prev + 20))
        else if (seconds < 240)
            setPoints(prev => (prev + 40))
        else if (seconds >= 240)
            setPoints(prev => (prev + 100))
    }, [seconds])

    const handleHomeClick = () => {
        sessionStorage.username = ''

        onHomeClick()
    }

    const handlePauseClick = () => {
        setPause(!pause)
    }

    return <>
        <header className='fixed top-0 left-0 w-full p-1 bg-transparent flex flex-row justify-between items-center'>
            <p className='text-white text-lg mt-2 ml-2'>{username}</p>
            <div>
                <p className='text-white'>Points: {points}</p>
                <Timer pause={pause} seconds={seconds} setSeconds={setSeconds} end={end} />
            </div>
            <div>
                <Button className='text-white text-lg bg-transparent border border-solid border-white mt-2 mr-2 p-1 rounded' onClick={handlePauseClick}>Pause</Button>
                <Button className='text-white text-lg bg-transparent border border-solid border-white mt-2 mr-2 p-1 rounded' onClick={handleHomeClick}>Home</Button>
            </div>
        </header >

        <main className='h-full w-full flex flex-col justify-center items-center'>
            {pause && <PauseMenu points={points} onHomeClick={handleHomeClick} onResumeClick={handlePauseClick} />}
            {end && <GameOver points={points} onHomeClick={handleHomeClick} />}
            <Screen pause={pause} end={end} setEnd={setEnd} />
        </main>

    </>
}