import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

import useContext from '../context'

import GameBanner from './GameBanner'
import UserBanner from './UserBanner'

export default function SearchResults({ onGameClick, onUserClick }) {
    const { alert } = useContext()

    const [searchParams] = useSearchParams()

    const q = searchParams.get('q') || ''

    const [results, setResults] = useState([])
    const [debounceTimer, setDebounceTimer] = useState(null)

    useEffect(() => {
        if (q !== '' || q !== '@') {
            debounceSearch()
        } else {
            clearTimeout(debounceTimer)
            setResults([])
        }
    }, [q])

    const loadGames = () => {
        try {
            logic.searchGame(q)
                .then(games => setResults(games))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const loadUsers = () => {
        try {
            logic.searchUser(q.slice(1))
                .then(users => setResults(users))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const debounceSearch = () => {
        if (debounceTimer)
            clearTimeout(debounceTimer)

        setDebounceTimer(setTimeout(() => {
            if (q.startsWith('@'))
                loadUsers()
            else
                loadGames()
        }, 1000))
    }

    return <section className='flex flex-col'>
        {results.length > 0 && (q.startsWith('@') ?
            results.map(user => <UserBanner key={user.id} user={user} onInteraction={loadUsers} onUserClick={onUserClick} />) :
            results.map(game => <GameBanner key={game.id} game={game} onInteraction={loadGames} onGameClick={onGameClick} collectionType={'search'} />))}
    </section>
}
