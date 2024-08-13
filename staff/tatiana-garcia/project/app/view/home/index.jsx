import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import Heading from '../library/Heading'
import Footer from './Footer'

export default function Home({ onLogout }) {
    const navigate = useNavigate()

    const handleHome = () => navigate('/')

    const handlePetsitters = () => navigate('/petsitters')

    const handleContact = () => navigate('/contact')

    const hadleLogin = () => navigate('/login')

    return <>
        <Header onLogout={onLogout}></Header>

        <main className='bg-teal-100 h-screen'>
            <Heading>Exoticus</Heading>
        </main>

        <Footer onHomeClick={handleHome} onPetsittersClick={handlePetsitters} onContactClick={handleContact} onLoginClick={hadleLogin} />
    </>
}