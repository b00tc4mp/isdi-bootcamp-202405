import logic from '../../../logic/index.mjs'

const { Component } = React

class Header extends Component {
    constructor() {
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
        try {
            logic.logoutUser()

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <header className="header">
            <p className="header__user-name">Hello, {this.state.name}!</p>
            <button className="Button Button--active">🏚️</button>
            <button className="Button">Following</button>
            <button className="Button">💫</button>
            <button className="logout-button" onClick={this.handleLogout}>Logout</button>
        </header>
    }
}

export default Header