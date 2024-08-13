import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiHomeHeartFill } from 'react-icons/ri'
import { GiPawHeart } from 'react-icons/gi'
import { MdOutlineMail } from "react-icons/md"

import Button from '../library/Button'
import Container from '../library/Container'

export default function Footer({ onHomeClick, onPetsittersClick, onContactClick, onLoginClick }) {
    const [activeTab, setActiveTab] = useState('home')

    const handleTabClick = (tabName, clickHandler) => {
        setActiveTab(tabName)
        clickHandler()
    }

    return <footer className="fixed items-center bottom-0 left-0 w-full flex justify-evenly shadow-[0_-1px_1px] bg-white">
        <Container>
            <Button onClick={() => handleTabClick('home', onHomeClick)} className={`bg-transparent border-transparent rounded-lg border border-solid p-1 ${activeTab === 'home' ? 'text-purple-500' : 'text-dimgray'}`}>
                <RiHomeHeartFill size={24} />
            </Button>

            <Button onClick={() => handleTabClick('petsitters', onPetsittersClick)} className={`bg-transparent border-transparent rounded-lg border border-solid p-1 ${activeTab === 'petsitters' ? 'text-purple-500' : 'text-dimgray'}`}>
                <GiPawHeart size={24} />
            </Button>

            <Button onClick={() => handleTabClick('contact', onContactClick)} className={`bg-transparent border-transparent rounded-lg border border-solid p-1 ${activeTab === 'contact' ? 'text-purple-500' : 'text-dimgray'}`}>
                <MdOutlineMail size={24} />
            </Button>

            <Button onClick={() => handleTabClick('login', onLoginClick)} className={`bg-transparent border-transparent rounded-lg border border-solid p-1 ${activeTab === 'login' ? 'text-purple-500' : 'text-dimgray'}`}>
                <FaUser size={24} />
            </Button>
        </Container>
    </footer>
}