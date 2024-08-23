import { useState, useEffect } from 'react'

import Button from '../library/Button'

import Screen from './Screen'
import Timer from './Timer'

export default function Game({ username, onHomeClick }) {
    const [pause, setPause] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [end, setEnd] = useState(false)

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
            <Timer pause={pause} seconds={seconds} setSeconds={setSeconds} setEnd={setEnd} />
            <div>
                <Button className='text-white text-lg bg-transparent border border-solid border-white mt-2 mr-2 p-1 rounded' onClick={handlePauseClick}>Pause</Button>
                <Button className='text-white text-lg bg-transparent border border-solid border-white mt-2 mr-2 p-1 rounded' onClick={handleHomeClick}>Home</Button>
            </div>
        </header >

        <main className='h-full w-full flex flex-col justify-start items-center'>
            <Screen pause={pause} end={end} setEnd={setEnd} />
        </main>

    </>
}