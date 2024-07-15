import { Component } from 'react'

import Login from './Login'
import Register from './Register'
import Home from './Home'

import logic from '../logic'

class App extends Component {
    constructor() {
        console.debug('App -> constructor')

        super()

        this.state = { view: 'login' }
    }

    handleLogin() {
        console.debug('App -> handleLogin')

        this.setState({ view: 'home' })
    }

    handleRegisterClick() {
        console.debug('App -> handleRegisterClick')

        this.setState({ view: 'register' })
    }

    handleRegister() {
        console.debug('App -> handleRegister')

        this.setState({ view: 'login' })
    }

    handleLoginClick() {
        console.debug('App -> handleLoginClick')

        this.setState({ view: 'login' })
    }

    handleLogout() {
        console.debug('App -> handleLogout')

        this.setState({ view: 'login' })
    }

    render() {
        console.debug('App -> render')

        const { view } = this.state

        return <>
            {view === 'login' && <Login onLogin={this.handleLogin.bind(this)} onRegisterClick={this.handleRegisterClick.bind(this)} />}

            {view === 'register' && <Register onRegister={this.handleRegister.bind(this)} onLoginClick={this.handleLoginClick.bind(this)} />}

            {view === 'home' && <Home onLogout={this.handleLogout.bind(this)} />}
        </>
    }
}

export default App