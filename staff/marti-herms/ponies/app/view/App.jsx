import logic from '../logic';

import Register from './Register';
import Login from './Login';
import Home from './Home';

import { Component } from 'react';

class App extends Component {
    constructor() {
        super();

        this.state = { view: 'login' };

    }

    componentDidMount() {
        try {
            if (sessionStorage.username) {
                logic.getUserList((error, userList) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    if (!userList.includes(sessionStorage.username)) {
                        throw new Error('user doesn\'t exist');
                    }

                    this.setState({ view: 'home' })
                })
            }
        } catch (error) {
            console.error(error);

            if (error.message === 'user doesn\'t exist') {
                logic.logoutUser();
            }
        }
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