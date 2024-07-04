import logic from '../../../logic/index.mjs'

const { Component } = React

class Header extends Component {
    constructor() {
        console.debug('Header -> constructor')

        super()

        try {
            const name = logic.getUserName()

            this.state = { name }  // guardo aqui el nombre de la persona para que luego en render me lo pinte
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

    // state.name = es aqui cuando me pinta el nombre del usuario
    render() {
        console.debug('Header -> render')

        return <header className="header">
            <p className="header__user-name">Hello, {this.state.name}✨! </p>

            <button className="Button Button--active">🏚️</button>

            <button className="Button">🦄</button>

            <button className="Button" >🏳️‍🌈</button>

            <button className="Button" onClick={this.handleLogout}>🚪</button>
        </header>
    }
}

export default Header