import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
// import Footer from './Footer'
import Hello from './Hello'
import isUserLoggedIn from '../../logic/isUserLoggedIn'

export default function Home() {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(isUserLoggedIn())

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
    }

    return (
        <>
            <Header
                onHomeClick={handleHomeClick}
                onLogout={handleLogout}
                isAuthenticated={isAuthenticated}
            />

            <main className="flex flex-col items-center gap-4 mt-16 mb-12 dark:bg-black">
                <Routes>

                    <Route path="/hello/:to" element={<Hello />} />
                </Routes>
            </main>

            {/* <Footer/> */}
        </>
    )
}
