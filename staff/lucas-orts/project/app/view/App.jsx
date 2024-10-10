import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './login'
import Register from './register'
import logic from '../logic'

import Header from './home/Header'
import Footer from './home/Footer'
import ProductList from './home/ProductsList'
import AddProduct from './home/AddProduct'
import Search from './home/Search'
import Cart from './home/Cart'
import SearchResults from './home/SearchResults'
import Profile from './home/Profile'
import LastSearch from './home/LastSearch'

import Alert from './common/Alert'
import { Context } from './context'

export default function App({ }) {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(logic.isUserLoggedIn())
    const [alertMessage, setAlertMessage] = useState(null)
    const [lastSearch, setLastSearch] = useState(null)
    const [refreshCart, setRefreshCart] = useState(Date.now())

    const handleLoginClick = () => {
        navigate('/login')
    }
    const handleLogin = () => {
        setIsAuthenticated(true)
        navigate('/')
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        navigate('/') // Redirigir a Home después de logout
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }

    const handleAlertAccept = () => setAlertMessage(null)

    return (
        <Context.Provider value={{ alert: setAlertMessage, lastSearch, setLastSearch }}>
            <>
                <Header
                    onLoginClick={handleLoginClick}
                    onLogout={handleLogout}
                    isAuthenticated={isAuthenticated} />
                <main className='flex flex-col w-screen items-center gap-4 mt-28 mb-14'>
                    <Routes>

                        <Route path='/login' element={<Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />} />
                        <Route path='/register' element={<Register onRegister={() => navigate('/login')} onLoginClick={handleLoginClick} />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/product' element={<AddProduct />} />
                        <Route path='/products' element={<ProductList />} />
                        <Route path='/cart' element={<Cart setRefreshCart={setRefreshCart} />} />
                        <Route path='/search' element={<SearchResults setRefreshCart={setRefreshCart} />} />
                        <Route path='/lastsearch' element={<LastSearch setRefreshCart={setRefreshCart} />} />
                        <Route path='/*' element={<Search />} />
                    </Routes>
                </main>
                <Footer
                    isAuthenticated={isAuthenticated}
                    refreshCart={refreshCart}
                />
                {alertMessage && <Alert message={alertMessage} onAccept={handleAlertAccept} />}
            </>
        </Context.Provider>
    )
}
