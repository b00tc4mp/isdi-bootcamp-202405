import { useState, useEffect } from 'react'

import logic from '../../logic'

import useContext from '../context.js'
import GameBanner from './GameBanner.jsx'
import extractPayloadFromToken from '../../util/extractPayloadFromToken.js'

export default function Library({ onGameClick }) {
    const { alert } = useContext()

    const { role } = extractPayloadFromToken(sessionStorage.token)

    const [games, setGames] = useState([])
    const [libraryVisibility, setLibraryVisibility] = useState(false)
    const [favsVisibility, setFavsVisibility] = useState(false)
    const [devGamesVisibility, setdevGamesVisibility] = useState(false)

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

    const devGames = () => {
        try {
            logic.getDevUserGames()
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
        setdevGamesVisibility(false)
        setLibraryVisibility(!libraryVisibility)

        libraryGames()
    }

    const handleFavs = () => {
        setLibraryVisibility(false)
        setdevGamesVisibility(false)
        setFavsVisibility(!favsVisibility)

        favsGames()
    }

    const handleDevGames = () => {
        setLibraryVisibility(false)
        setFavsVisibility(false)
        setdevGamesVisibility(!devGamesVisibility)

        devGames()
    }

    return <div>
        {role === 'dev' && <>
            <button className='w-full h-8 bg-black text-white border border-solid border-slate-700' onClick={handleDevGames}>Games</button>
            {devGamesVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={devGames} onGameClick={onGameClick} collectionType={'devGames'} />)}
        </>}
        <button className='w-full h-8 bg-black text-white border border-solid border-slate-700' onClick={handleLibrary}>Library</button>
        {libraryVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={libraryGames} onGameClick={onGameClick} collectionType={'library'} />)}
        <button className='w-full h-8 bg-black text-white border border-solid border-slate-700' onClick={handleFavs}>Favs</button>
        {favsVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={favsGames} onGameClick={onGameClick} collectionType={'favs'} />)}
    </div>
}