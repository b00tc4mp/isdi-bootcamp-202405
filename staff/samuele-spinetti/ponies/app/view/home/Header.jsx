import logic from '../../logic'

import Button from '../components/Button'
import Container from '../components/Container'
import Image from '../components/Image'

const Header = ({ onProfileSettingsClicked, onHomeClicked, onFavsPostsClicked, onFollowingUsersPostsClicked, onLogout }) => {

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleProfileSettingsClick = () => {
        onProfileSettingsClicked()
    }

    const handleHomeClick = () => {
        onHomeClicked()
    }

    const handleFavPostsClick = () => {
        onFavsPostsClicked()
    }

    const handleFollowingUsersPostsClick = () => {
        onFollowingUsersPostsClicked()
    }

    return <header className="header">

        <Container className={"profile-action"}>
            <Button className={"profile-button"} onClick={handleProfileSettingsClick}>
                <Image className={"profile__icon"} src={"https://svgsilh.com/svg/1299805.svg"} />
            </Button>

        </Container>

        <Container className={"home-action"}>
            <Button className={"home__button"} onClick={handleHomeClick}>
                <Image className={"home__icon"} src={"https://svgsilh.com/svg/309113.svg"} />
            </Button>
        </Container>

        <Container className={"follow-action"}>
            <Button className={"follows__button"} onClick={handleFollowingUsersPostsClick}>
                <Image className={"follows__icon"} src={"https://svgsilh.com/svg/3392560-ffffff.svg"} />
            </Button>
        </Container>

        <Container className={"favs-action"}>
            <Button className={"favs__button"} onClick={handleFavPostsClick}>
                <Image className={"favs__icon"} src={"https://svgsilh.com/svg/297837-ffc107.svg"} />
            </Button>
        </Container>

        <Button className={"logout-button"} onClick={handleLogoutClick}>
            <Image className={"logout__icon"} src={"https://svgsilh.com/svg/1699614.svg"} />
        </Button>

    </header>
}

export default Header