import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'
import Game from './Game'

export default function GameSearchResults({ refreshStamp }) {
    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [games, setGames] = useState([])

    useEffect(() => {
        loadGames()
    }, [refreshStamp, q])

    const loadGames = () => {
        try {
            logic.searchGame(q)
                .then(games => setGames(games))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch {
            console.error(error)

            alert(error.message)
        }
    }

    const maxView = 5

    let count = 0

    return <section className='flex flex-col gap-4'>
        {games.map(game => {
            count++

            if (count <= maxView)
                return <Game key={game.id} game={game} />

            return
        })}
    </section>
}
