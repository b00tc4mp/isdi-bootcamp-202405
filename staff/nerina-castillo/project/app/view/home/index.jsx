import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Heading from '../library/Heading'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const navigate = useNavigate()

    // const handleHomeClick = () => {
    //     navigate('/')
    // }

    //TODO Header
    return <main>
        <Heading>Hello</Heading>
        <Routes>
            <Route path='/'></Route>
        </Routes>
    </main>

}