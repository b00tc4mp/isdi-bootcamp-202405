import { useContext } from 'react'
import Context from '../../Context'
import logic from '../../logic'

import Button from '../library/Button'
import Container from '../library/Container'
import Image from '../library/Image'
import SunIcon from '../icons/SunIcon'

const Header = ({ onProfileSettingsClicked, onHomeClicked, onFavsPostsClicked, onFollowingUsersPostsClicked, onLogout }) => {

    const { theme, setTheme } = useContext(Context)

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

    const handleThemeSwitchClick = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return <header className="fixed w-full flex justify-around gap-4 bg-[#ff4cad] dark:bg-green-400 p-2 items-center box-border shadow-[0_1px_1px] shadow-[#ff4cad] top-0 left-0 z-40">

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

        <Container className={"flex flex-col items-center"}>
            <Button className={"bg-transparent border-none"} onClick={handleThemeSwitchClick}>
                <SunIcon theme={theme} />
            </Button>

        </Container>

        <Button className={"bg-transparent border-none"} onClick={handleLogoutClick}>
            < Image className={"h-[25px] w-[25px]"} src={"https://svgsilh.com/svg/1699614.svg"} />
        </Button>

    </header >
}

export default Header