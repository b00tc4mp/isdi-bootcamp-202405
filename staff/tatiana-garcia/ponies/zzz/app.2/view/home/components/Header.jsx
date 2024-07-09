import logic from '../../../logic/index.mjs'

const { Component } = React

import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'

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
            <Paragraph>Hello, {this.state.name}!</Paragraph>
            <Button onClick={this.handleHomeClick.bind(this)}>🏯</Button>
            <Button onClick={this.handlePoniesClick.bind(this)}>🦄</Button>
            <Button onClick={this.handleFavsClick.bind(this)}>🤩</Button>
            <Button onClick={this.handleLogout}>Logout</Button>
        </header>
    }
}

export default Header