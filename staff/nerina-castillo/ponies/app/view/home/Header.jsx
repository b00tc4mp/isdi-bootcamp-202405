import logic from '../../logic'

import { useState, useEffect } from 'react'

import Button from '../components/Button'
import Paragraph from '../components/Paragraph'


const Header = ({ onHomeClick, onPoniesClick, onFavsClick, onLogout }) => {
    console.debug('Header -> call')

    const [name, setName] = useState(null)

    useEffect(() => {
        console.debug('Header -> useEffect')

        try {
            logic.getUserName()
                .then(name => setName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleHomeClick = () => {
        console.debug('Header -> handleHomeClick')

        onHomeClick()
    }

    const handlePoniesClick = () => {
        console.debug('Header -> handlePoniesClick')

        onPoniesClick()
    }

    const handleFavsClick = () => {
        console.debug('Header -> handleFavsClick')

        onFavsClick()
    }

    const handleLogout = () => {
        console.debug('Header -> handleLogout')

        try {
            logic.logoutUser()

            onLogout()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    return <header className="fixed start-0 top-0 w-full flex justify-around items-center  bg-[white] box-border shadow-[0_4px_8px_rgba(0,0,0,0.2)] py-2 px-0 z-10">
        <Paragraph>Hello, {name}!</Paragraph>
        <Button onClick={handleHomeClick} >🏚️</Button>
        <Button onClick={handlePoniesClick} >Following</Button>
        <Button onClick={handleFavsClick} >💫</Button>
        <Button className={"bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[5px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] mr-px-[.5rem]"} onClick={handleLogout} >Logout</Button>
    </header>
}


export default Header