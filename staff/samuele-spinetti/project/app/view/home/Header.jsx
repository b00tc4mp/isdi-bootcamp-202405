import useContext from '../context.js'

import logic from '../../logic'

import Container from '../library/Container'
import Button from '../library/Button'
import Image from '../library/Image'

export default function Header({ onProfileSettingsClicked, onLogout }) {
    const { alert } = useContext()

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleProfileSettingsClick = () => onProfileSettingsClicked()

    return <header className="fixed w-full flex justify-between bg-gradient-to-br from-green-400 to-fuchsia-500 gap-4 p-2 items-center box-border shadow-[0_1px_1px] h-20 top-0 left-0 z-40">

        <Container className="ml-5">
            <Button onClick={handleProfileSettingsClick}>
                <Image src="/userIcon.svg" alt="User icon" className="h-[30px] w-[30px]" />
            </Button>
        </Container>

        <Container className="mr-5">
            <Button className="border-black " onClick={handleLogoutClick}>Logout</Button>
        </Container>

    </header >
}