import logic from "../../..//logic/index.mjs"

const { Component } = React

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

        return <header class="header">
            <p class="header__user-name">Hello, {this.state.name}!</p>
            <button class="Button Button--active">🏠</button>
            <button class="Button">🪅</button>
            <button class="Button">🏳️‍🌈</button>
            <button class="Button" onClick={this.handleLogout}>Logout</button>
        </header>
    }
}

export default Header
