import { useNavigate } from 'react-router-dom'

import Header from '../home/Header'
import Footer from '../home/Footer'

export default function Petsitters() {
    const navigate = useNavigate()

    const handleHome = () => navigate('/')

    const handlePetsitters = () => navigate('/petsitters')

    const handleContact = () => navigate('/contact')

    const handleLogout = () => navigate('/login')

    return <>
        <Header />
        <main className='bg-teal-100 h-screen flex flex-col items-center justify-center gap-4 text-[1.1rem]'>


        </main>

        <Footer onHomeClick={handleHome} onPetsittersClick={handlePetsitters} onContactClick={handleContact} onLoginClick={handleLogout} />


    </>
}