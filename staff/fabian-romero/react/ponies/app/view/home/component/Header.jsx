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

    handleHomeClick() {
        console.debug('Header -> handleHomeClick')

        this.props.onHomeClick() // saber por qué??
    }

    handlePoniesClick() {
        console.debug('Header -> handlePoniesClick')

        this.props.onPoniesClick()
    }

    handleFavsClick() {
        console.debug('Header -> handleFavsClick')

        this.props.onFavsClick()
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
            <p className="header__user-name">Hello, {this.state.name}✨! </p>

            <button className="Button Button--active" onClick={this.handleHomeClick.bind(this)}>🏚️</button>

            <button className="Button" onClick={this.handlePoniesClick.bind(this)}>🦄</button>

            <button className="Button" onClick={this.handleFavsClick.bind(this)}>🏳️‍🌈</button>

            <button className="Button" onClick={this.handleLogout}>🚪</button>
        </header>
    }
}

export default Header