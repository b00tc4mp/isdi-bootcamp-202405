import { useState, useEffect } from "react"

import useContext from '../context'

export default function Home() {
    const [username, setUsername] = useState(null)

    useEffect(() => {
        try {
            logic.getUserUsername()
                .then(username => setName(username))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    return <p>Hello, {username}</p>
}