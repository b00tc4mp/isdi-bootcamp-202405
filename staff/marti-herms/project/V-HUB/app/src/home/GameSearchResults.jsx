import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import useContext from '../context'

import GameBanner from './GameBanner'

export default function GameSearchResults({ refreshStamp, onGameClick }) {
    const { alert } = useContext()

    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [games, setGames] = useState([])

    const maxView = 5

    let count = 0

    useEffect(() => {
        loadGames()

        count = 0
    }, [refreshStamp, q])

    const loadGames = () => {
        try {
            logic.searchGame(q)
                .then(games => setGames(games))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <section className='flex flex-col gap-4'>
        {games.map(game => {
            count++

            if (count <= maxView)
                return <GameBanner key={game.id} game={game} onInteraction={loadGames} onGameClick={onGameClick} />

            return
        })}
    </section>
}
