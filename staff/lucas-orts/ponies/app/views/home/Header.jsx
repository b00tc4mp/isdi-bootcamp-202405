import logic from "../../logic/index.mjs"

import { Component } from 'react'

import Paragraph from "../components/Paragraph"
import Button from "../components/Button"

import './Header.css'
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

            this.props.onLogout()
        }
        catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    render() {
        return <header className="header">
            <Paragraph>Hello, {this.state.name}!</Paragraph>
            <Button onClick={this.handleHomeClick.bind(this)}>🏠</Button>
            <Button onClick={this.handleFollowClick.bind(this)}>Following</Button>
            <Button onClick={this.handleFavsClick.bind(this)}>🏴‍☠️</Button>
            <Button onClick={this.handleLogout.bind(this)}>Logout</Button>
        </header>
    }
}

export default Header