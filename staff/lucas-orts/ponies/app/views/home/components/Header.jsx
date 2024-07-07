import logic from '../../../logic/index.mjs'

const { Component } = React

class Header extends Component {
    constructor() {
        super()

        try {
            const name = logic.getUserName()

            this.state = { name }
        }
        catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    handleHomeClick() {
        this.props.onHomeClick()
    }

    handleFollowClick() {
        this.props.onFollowClick()
    }

    handleFavsClick() {
        this.props.onFavsClick()
    }

    handleLogout() {
        try {
            logic.logoutUser()

            location.href = '../Login'
        }
        catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    render() {
        return <header className="header">
            <p className="header__user-name">Hello, {this.state.name}!</p>
            <button className="button" onClick={this.handleHomeClick.bind(this)}>🏠</button>
            <button className="button" onClick={this.handleFollowClick.bind(this)}>Follow</button>
            <button className="button" onClick={this.handleFavsClick.bind(this)}>🏴‍☠️</button>
            <button className="button" onClick={this.handleLogout}>Logout</button>
        </header>
    }
}

export default Header