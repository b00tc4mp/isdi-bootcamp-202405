import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Heading from '../library/Heading'
import logic from '../../logic'
import Header from './Header'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()
    const [name, setName] = useState(null)

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => setName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    // const handleHomeClick = () => {
    //     navigate('/')
    // }

    //TODO Header
    return <main>
        <Header
            onLogout={onLogout}
        />
        <Heading>Hello, {name}</Heading>
        <Routes>
            <Route path='/'></Route>
        </Routes>
    </main>

}