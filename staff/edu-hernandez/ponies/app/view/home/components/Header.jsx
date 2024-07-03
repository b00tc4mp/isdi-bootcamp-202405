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
            <button className="Button Button--active">Home</button>
            <button className="Button">unfav</button>
            <button className="Button">add fav</button>
            <button className="Button" onClick={this.handleLogout}>Logout</button>
        </header>
    }
}

export default Header