import logic from '../../../logic/index.mjs'

import { Component } from 'react'

class Header extends Component {
    constructor() {
        console.debug('Header -> constructor')

        super()

        try {
            const name = logic.getUserName()

            this.state = { name }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLogout() {
        console.debug('Header -> handleLogout')

        try {
            logic.logoutUser()

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Header -> render')

        return <header className="header">
            <p className="header__user-name">Hello, {this.state.name}!</p>
            <button className="Button Button--active">Home</button>
            <button className="Button">Following</button>
            <button className="Button">Favs</button>
            <button className="Button" onClick={this.handleLogout}>Logout</button>
        </header>
    }
}

export default Header