import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useContext from '../context.js'

import logic from '../../logic'

import Container from '../library/Container'
import Button from '../library/Button'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'

export default function Header({ onProfileSettingsClicked, onInboxClicked, onSavedListClicked, onHelpClicked, onLogout, refreshStamp }) {
    const { alert } = useContext()
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [menuItems, setMenuItems] = useState(false)

    useEffect(() => {
        const userId = logic.getUserId()

        try {
            logic.getUser(userId)
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [refreshStamp])

    const handleCLoseMenu = () => setMenuItems(false)

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            setMenuItems(false)

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleMenuItemsClick = event => {
        event.stopPropagation()

        if (menuItems)
            setMenuItems(false)
        else setMenuItems(true)
    }

    const handleProfileSettingsClick = () => {
        onProfileSettingsClicked()

        setMenuItems(false)
    }

    const handleInboxClick = () => {
        onInboxClicked()

        setMenuItems(false)
    }

    const handleSavedClick = () => {
        onSavedListClicked()

        setMenuItems(false)
    }

    const handleHelpClick = () => {
        onHelpClicked()

        setMenuItems(false)
    }

    return <header className="fixed w-full flex justify-between bg-gradient-to-br from-green-400 to-fuchsia-500 gap-4 p-2 items-center box-border shadow-[0_1px_1px] h-20 top-0 left-0 z-40">

        <Container className="ml-5">
            <Button onClick={handleMenuItemsClick} >
                <Image alt="User avatar"
                    src={!user?.avatar ? '/profileIcon.svg' : user.avatar}
                    className="relative inline-block object-cover object-center w-12 h-12 rounded-xl cursor-pointer"
                    data-popover-target="profile-menu" />
            </Button>
            {menuItems && <>
                <Container onClick={handleCLoseMenu} id="fader" className="absolute w-screen top-0 left-0 h-screen bg-transparent">

                    <ul role="menu" data-popover="profile-menu" data-popover-placement="bottom" id="menu"
                        className="absolute z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none mt-3 top-20 left-4">
                        <Button onClick={handleProfileSettingsClick} role="menuitem"
                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <Image src="/MyProfile.svg" />
                            <Paragraph className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                My Profile
                            </Paragraph>
                        </Button>
                        <Button onClick={handleInboxClick} role="menuitem"
                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <Image src="/Inbox.svg" />
                            <Paragraph className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                Inbox
                            </Paragraph>
                        </Button>
                        <Button onClick={handleSavedClick} role="menuitem"
                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <Image src="/heart.svg" />
                            <Paragraph className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                Saved
                            </Paragraph>
                        </Button>
                        <Button onClick={handleHelpClick} role="menuitem"
                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <Image src="/Help.svg" />
                            <Paragraph className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                Help
                            </Paragraph>
                        </Button>
                        <hr className="my-2 border-blue-gray-50" role="menuitem" />
                        <Button onClick={handleLogoutClick} role="menuitem"
                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <Image src="/SignOut.svg" />
                            <Paragraph className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                Sign Out
                            </Paragraph>
                        </Button>
                    </ul>
                </Container>
            </>}
        </Container>
    </header >
}