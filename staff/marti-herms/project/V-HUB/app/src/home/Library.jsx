import { useState, useEffect } from 'react'

import logic from '../../logic'

import useContext from '../context.js'
import GameBanner from './GameBanner.jsx'

export default function Library() {
    const { alert } = useContext()

    const [games, setGames] = useState([])
    const [libraryVisibility, setLibraryVisibility] = useState(false)
    const [favsVisibility, setFavsVisibility] = useState(false)

    const libraryGames = () => {
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
    }

    const favsGames = () => {
        try {
            logic.getUserFavs()
                .then(games => setGames(games))
                .catch(error => {
                    console.error(error)

                    alert(error.messsage)
                })
        } catch (error) {
            console.error(error)

            alert(error.messsage)
        }
    }

    const handleLibrary = () => {
        setFavsVisibility(false)
        setLibraryVisibility(!libraryVisibility)

        libraryGames()
    }

    const handleFavs = () => {
        setLibraryVisibility(false)
        setFavsVisibility(!favsVisibility)

        favsGames()
    }

    return <div>
        <button className='w-full h-8 bg-black text-white border border-solid border-slate-700' onClick={handleLibrary}>Library</button>
        {libraryVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={libraryGames} />)}
        <button className='w-full h-8 bg-black text-white border border-solid border-slate-700' onClick={handleFavs}>Favs</button>
        {favsVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={favsGames} />)}
    </div>
}