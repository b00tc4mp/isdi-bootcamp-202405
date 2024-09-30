import logic from '../../logic'
import { useState, useEffect } from 'react'

import User from './User'
import Alert from '../common/Alert'

export default function MatchList() {
    console.debug('MatchList -> call')

    const [users, setUsers] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [matchMessage, setMatchMessage] = useState('')

    useEffect(() => {
        console.debug('MatchList -> useEffect')

        loadUsers()
    }, [])

    const handleChatClick = () => {
        console.debug('MatchList -> handleChatClick')

        loadUsers()
    }

    const loadUsers = () => {
        try {
            logic.getAllMatchs()
                .then(users => {
                    setUsers(users)
                    if (users.length > 0) {
                        setMatchMessage(`¡Tienes un nuevo match con ${users[0].name}!`)
                        setShowAlert(true)
                    }
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleAcceptAlert = () => {
        setShowAlert(false)
    }

    return (
        <>
            {showAlert && (
                <Alert message={matchMessage} onAccept={handleAcceptAlert} />
            )}

            <section className="flex bg-cyan-900 h-full  flex-col gap-4">
                {users.map(user => (
                    <User
                        key={user.id}
                        user={user}
                        listType="matchList"
                        onChatClick={handleChatClick}
                    />
                ))}
            </section>
        </>
    )
}
