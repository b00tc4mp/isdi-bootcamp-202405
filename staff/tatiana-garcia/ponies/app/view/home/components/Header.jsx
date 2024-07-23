import { Component } from 'react'

import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'

import logic from '../../../logic'

import './Header.css'


class Header extends Component {
    constructor() {
        console.debug('Header -> constructor')

        super()


        this.state = { name: null }
    }

    componentDidMount() {
        try {
            logic.getUserName((error, name) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ name })
            })
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

            this.props.onLogout()
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
            <Button className='post-action-button' onClick={this.handleLogout.bind(this)}>Logout</Button>
        </header>
    }
}

export default Header