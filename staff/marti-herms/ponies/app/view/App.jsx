import Register from './Register';
import Login from './Login';
import Home from './Home';

import { useState } from 'react';

const App = () => {
    const [view, setView] = useState(sessionStorage.username ? 'home' : 'login')

    const handleLogin = () => {
        setView('home');
    }

    const handleRegister = () => {
        setView('login');
    }

    const handleRegisterClick = () => {
        setView('register');
    }

    const handleLogout = () => {
        setView('login');
    }

    return <>
        {view === 'login' && <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />}
        {view === 'register' && <Register onRegister={handleRegister} onLoginClick={handleRegister} />}
        {view === 'home' && <Home onLogout={handleLogout} />}
    </>

}

export default App