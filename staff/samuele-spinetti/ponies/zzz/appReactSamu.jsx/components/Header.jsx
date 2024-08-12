import logic from '../../../logic'

import { Component } from 'react'

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

    handleLogoutClick() {
        try {
            logic.logoutUser()

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleHomeClick() {
        this.props.onHomeClicked()
    }

    handleFavPostsClick() {
        this.props.onFavsPostsClicked()
    }

    handleFollowingUsersPostsClick() {
        this.props.onFollowingUsersPostsClicked()
    }

    render() {
        return <header className="header">

            <p className="header__username">Hello, {this.state.name}!</p>

            <div className="home-action">
                <button className="home__button" onClick={this.handleHomeClick.bind(this)}>
                    <img className="home__icon" src="https://svgsilh.com/svg/309113.svg" />
                </button>
            </div>

            <div className="follow-action">
                <button className="follows__button" onClick={this.handleFollowingUsersPostsClick.bind(this)}>
                    <img className="follows__icon" src="https://svgsilh.com/svg/297837-ffc107.svg" />
                </button>
            </div>

            <div className="favs-action">
                <button className="favs__button" onClick={this.handleFavPostsClick.bind(this)}>
                    <img className="favs__icon" src="https://svgsilh.com/svg/2103508.svg" />
                </button>
            </div>

            <button className="logout-button" onClick={this.handleLogoutClick}>Logout</button>

        </header>
    }
}

export default Header