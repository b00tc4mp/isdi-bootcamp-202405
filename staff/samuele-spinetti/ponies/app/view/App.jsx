import { Component } from 'react'

import Login from './Login'
import Register from './Register'
import Home from './Home'

import logic from '../logic'

class App extends Component {
    constructor() {
        super()

        this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
    }

    handleLogin() {
        this.setState({ view: 'home' })
    }

    handleRegisterClick() {
        this.setState({ view: 'register' })
    }

    handleRegister() {
        this.setState({ view: 'login' })
    }

    handleLoginClick() {
        this.setState({ view: 'login' })
    }

    handleLogout() {
        this.setState({ view: 'login' })
    }

    render() {
        const { view } = this.state

        return <>
            {view === 'login' && <Login onLogin={this.handleLogin.bind(this)} onRegisterClick={this.handleRegisterClick.bind(this)} />}

            {view === 'register' && <Register onRegister={this.handleRegister.bind(this)} onLoginClick={this.handleLoginClick.bind(this)} />}

            {view === 'home' && <Home onLogout={this.handleLogout.bind(this)} />}
        </>
    }
}

export default App