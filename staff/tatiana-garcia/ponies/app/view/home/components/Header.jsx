import logic from '../../../logic/index.mjs'

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

    handleHomeClick() {
        console.debug('Header -> handleHomeClick')

        this.props.onHomeClick()
    }

    handlePoniesClick() {
        console.debug('Header -> handlePoniesClick')

        this.props.onPoniesClick()
    }

    handleFavsClick() {
        console.debug()

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
            <p className="header__user-name">Hello, {this.state.name}!</p>
            <button className="Button Button--active" onClick={this.handleHomeClick.bind(this)}>🏯</button>
            <button className="Button" onClick={this.handlePoniesClick.bind(this)}>🦄</button>
            <button className="Button" onClick={this.handleFavsClick.bind(this)}>🤩</button>
            <button className="Button" onClick={this.handleLogout}>Logout</button>
        </header>
    }
}

export default Header