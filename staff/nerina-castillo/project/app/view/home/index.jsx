import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Heading from '../library/Heading'
import logic from '../../logic/index.js'
import Header from './Header'
import Footer from './Footer'

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

    const handlePostCreated = () => setRefreshStamp(Date.now())


    return <>
        <Header
            onLogout={onLogout}
        />

        <main>
            <Heading>Hello, {name}</Heading>
            <Routes>
                <Route path='/'></Route>
            </Routes>
        </main>

        <Footer onPostCreated={handlePostCreated}></Footer>
    </>
}