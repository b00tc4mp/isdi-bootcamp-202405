import { useState, useEffect } from 'react'

import logic from '../../logic'

import useContext from '../context.js'
import GameBanner from './GameBanner.jsx'
import Button from '../library/Button.jsx'

import extractPayloadFromToken from '../../util/extractPayloadFromToken.js'

export default function Library({ onGameClick, user }) {
    const { alert } = useContext()

    const { sub: userId, role } = extractPayloadFromToken(sessionStorage.token)

    const [games, setGames] = useState([])
    const [libraryVisibility, setLibraryVisibility] = useState(false)
    const [favsVisibility, setFavsVisibility] = useState(false)
    const [devGamesVisibility, setdevGamesVisibility] = useState(false)

    const libraryGames = () => {
        try {
            logic.getUserLibrary((user && user.id) || userId)
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
            logic.getUserFavs((user && user.id) || userId)
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
            logic.getDevUserGames((user && user.id) || userId)
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
        {((!user && role) || user.role === 'dev') && <>
            <Button className='w-full h-[45px] bg-black text-white border border-solid border-slate-700' onClick={handleDevGames}>Games</Button>
            {devGamesVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={devGames} onGameClick={onGameClick} collectionType={'devGames'} />)}
        </>}
        <Button className='w-full h-[45px] bg-black text-white border border-solid border-slate-700' onClick={handleLibrary}>Library</Button>
        {libraryVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={libraryGames} onGameClick={onGameClick} collectionType={'library'} />)}
        <Button className='w-full h-[45px] bg-black text-white border border-solid border-slate-700' onClick={handleFavs}>Favs</Button>
        {favsVisibility && games.map(game => <GameBanner key={game.id} game={game} onInteraction={favsGames} onGameClick={onGameClick} collectionType={'favs'} />)}
    </div>
}