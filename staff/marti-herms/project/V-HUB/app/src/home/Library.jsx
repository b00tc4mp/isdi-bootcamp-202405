import { useState, useEffect } from 'react'

import logic from '../../logic'

import useContext from '../context.js'
import Game from './Game'

export default function Library() {
    const { alert } = useContext()

    const [games, setGames] = useState([])

    useEffect(() => {
        try {
            logic.getUserLibrary()
                .then(games => setGames(games))
                .catch(error => {
                    console.error(error)

                    alert(error.messsage)
                })
        } catch (error) {
            console.error(error)

            alert(error.messsage)
        }
    })

    return <div>
        {games.map(game => <Game game={game} />)}
    </div>
}