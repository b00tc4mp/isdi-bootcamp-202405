import { useState, useEffect } from 'react'

import Button from '../library/Button'

import Player from './Player'
import Controller from './Controller'
import Obstacles from './Obstacles'
import Timer from './Timer'
import PauseMenu from './PauseMenu'
import GameOver from './GameOver'

import logic from '../../logic'

export default function Game({ username, onHomeClick }) {
    const [pause, setPause] = useState(false)
    const [end, setEnd] = useState(false)
    const [player, setPlayer] = useState(logic.getPlayer())

    const handleHomeClick = () => {
        sessionStorage.username = ''

        onHomeClick()
    }

    const handlePauseClick = () => {
        setPause(!pause)
    }

    const handleRestartClick = () => {
        setEnd(false)

        setPlayer(() => (logic.getPlayer()))
    }

    return <>
        <header className='fixed top-0 left-0 w-full p-1 bg-transparent flex flex-row justify-between items-center'>
            <p className='text-white text-lg mt-2 ml-2'>{username}</p>
            <div>
                <Timer pause={pause} end={end} />
            </div>
            <div>
                <Button className='text-white text-lg bg-transparent border border-solid border-white mt-2 mr-2 p-1 rounded' onClick={handlePauseClick}>Pause</Button>
                <Button className='text-white text-lg bg-transparent border border-solid border-white mt-2 mr-2 p-1 rounded' onClick={handleHomeClick}>Home</Button>
            </div>
        </header >

        <main className='h-full w-full flex flex-col justify-center items-center'>
            {pause && <PauseMenu onHomeClick={handleHomeClick} onResumeClick={handlePauseClick} />}
            {end && <GameOver onRestartClick={handleRestartClick} onHomeClick={handleHomeClick} />}
            <Obstacles player={player} pause={pause} end={end} setEnd={setEnd} />
            <Player player={player} />
            <Controller player={player} setPlayer={setPlayer} pause={pause} end={end} />
        </main>
    </>
}