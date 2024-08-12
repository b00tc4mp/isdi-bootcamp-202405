// import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useContext } from 'react'
import Context from '../../Context'


import logic from '../../logic'

import Header from './Header'
import Footer from './Footer'

import Paragraph from '../library/Paragraph'

export default function Home({ onLogout }) {
    const [userName, setUserName] = useState(null)
    const { alert } = useContext(Context)

    useEffect(() => {
        try {
            logic.getUserName()
                .then(userName => setUserName(userName))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [userName])

    // const handleHomeClick = () => {
    //     navigate('/')
    // }

    return <main className="flex h-screen w-screen">
        <Header onLogout={onLogout}></Header >
        <Paragraph className="justify-center items-center">Hello, {userName}</Paragraph>
        <Footer></Footer>
    </main>
}