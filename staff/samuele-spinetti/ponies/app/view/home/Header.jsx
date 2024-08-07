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

    return <header className="fixed w-full flex justify-around gap-4 bg-[#ff4cad] p-2 items-center box-border shadow-[0_1px_1px] shadow-[#ff4cad] top-0 left-0 z-40">

        <Container className={"flex flex-col items-center"}>
            <Button className={"bg-transparent border-none"} onClick={handleProfileSettingsClick}>
                <Image className={"h-[20px] w-[25px]"} src={"https://svgsilh.com/svg/1299805.svg"} />
            </Button>

        </Container>

        <Container className={"home-action"}>
            <Button className={"bg-transparent border-none"} onClick={handleHomeClick}>
                <Image className={"h-[20px] w-[20px]"} src={"https://svgsilh.com/svg/309113.svg"} />
            </Button>
        </Container>

        <Container className={"follow-action"}>
            <Button className={"bg-transparent border-none"} onClick={handleFollowingUsersPostsClick}>
                <Image className={"h-[20px] w-[20px]"} src={"https://svgsilh.com/svg/3392560-ffffff.svg"} />
            </Button>
        </Container>

        <Container className={"favs-action"}>
            <Button className={"bg-transparent border-none"} onClick={handleFavPostsClick}>
                <Image className={"h-[20px] w-[20px]"} src={"https://svgsilh.com/svg/297837-ffc107.svg"} />
            </Button>
        </Container>

        <Button className={"bg-transparent border-none"} onClick={handleLogoutClick}>
            < Image className={"h-[25px] w-[25px]"} src={"https://svgsilh.com/svg/1699614.svg"} />
        </Button>

    </header >
}

export default Header