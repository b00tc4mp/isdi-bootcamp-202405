import logic from '../logic';

import Register from './Register';
import Login from './Login';
import Home from './Home';

import { Component } from 'react';

class App extends Component {
    constructor() {
        super();

        this.state = { view: sessionStorage.username ? 'home' : 'login' };

    }

    handleLogin() {
        this.setState({ view: 'home' });
    }

    handleRegister() {
        this.setState({ view: 'login' });
    }

    handleRegisterClick() {
        this.setState({ view: 'register' });
    }

    handleLogout() {
        this.setState({ view: 'login' });
    }

    render() {
        const { view } = this.state;
        return <>
            {view === 'login' && <Login onLogin={this.handleLogin.bind(this)} onRegisterClick={this.handleRegisterClick.bind(this)} />}
            {view === 'register' && <Register onRegister={this.handleRegister.bind(this)} onLoginClick={this.handleRegister.bind(this)} />}
            {view === 'home' && <Home onLogout={this.handleLogout.bind(this)} />}
        </>
    }
}

export default App