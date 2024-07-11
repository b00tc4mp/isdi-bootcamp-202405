import logic from '../../logic/index.mjs'

import { Component } from 'react'

import Button from '../components/Button'
import Container from '../components/Container'
import Image from '../components/Image'

class Header extends Component {
    constructor() {
        super()
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

    handleProfileSettingsClick() {
        this.props.onProfileSettingsClicked()
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

            <Container className={"profile-action"}>
                <Button className={"profile-button"} onClick={this.handleProfileSettingsClick.bind(this)}>
                    <Image className={"profile__icon"} src={"https://svgsilh.com/svg/1299805.svg"} />
                </Button>

            </Container>

            <Container className={"home-action"}>
                <Button className={"home__button"} onClick={this.handleHomeClick.bind(this)}>
                    <Image className={"home__icon"} src={"https://svgsilh.com/svg/309113.svg"} />
                </Button>
            </Container>

            <Container className={"follow-action"}>
                <Button className={"follows__button"} onClick={this.handleFollowingUsersPostsClick.bind(this)}>
                    <Image className={"follows__icon"} src={"https://svgsilh.com/svg/3392560-ffffff.svg"} />
                </Button>
            </Container>

            <Container className={"favs-action"}>
                <Button className={"favs__button"} onClick={this.handleFavPostsClick.bind(this)}>
                    <Image className={"favs__icon"} src={"https://svgsilh.com/svg/297837-ffc107.svg"} />
                </Button>
            </Container>

            <Button className={"logout-button"} onClick={this.handleLogoutClick}>
                <Image className={"logout__icon"} src={"https://svgsilh.com/svg/1699614.svg"} />
            </Button>

        </header>
    }
}

export default Header