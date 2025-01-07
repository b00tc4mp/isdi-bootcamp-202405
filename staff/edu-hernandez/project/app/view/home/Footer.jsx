import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIcon, CalendarIcon, HeartIcon, MapIcon } from '@heroicons/react/outline'

import Button from '../library/Button'

export default function Footer({ onHomeClick, onMapClicked, onCalendarClicked, onGoingEventsClicked, onFavsEventsClicked }) {
    // console.debug('Footer -> call')

    const navigate = useNavigate()
    const [activeButton, setActiveButton] = useState('')

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName)
    }

    const handleHomeClick = () => {
        handleButtonClick('home')
        navigate('/')
    }

    const handleMapClick = () => {
        if (onMapClicked) { onMapClicked() }
        handleButtonClick('map')
    }

    const handleCalendarClick = () => {
        if (onCalendarClicked) { onCalendarClicked() }
        handleButtonClick('calendar')
    }

    const handleGoingClick = () => {
        if (onGoingEventsClicked) { onGoingEventsClicked() }
        handleButtonClick('go!')
    }

    const handleFavsClick = () => {
        if (onFavsEventsClicked) { onFavsEventsClicked() }
        handleButtonClick('favs')
    }

    return (
        <footer className="flex flex-row py-2 fixed bottom-0 left-0 w-full justify-around items-center z-10
        bg-background_grey 
        text-white p-2 shadow-custom">

            <Button onClick={handleHomeClick} className="flex flex-col items-center space-y-1" >
                <HomeIcon className={`stroke-dark_white h-8 w-8 sm:h-10 sm:w-10 ${activeButton === 'home' ? 'stroke-ore' : ''}`} />
            </Button>

            <Button onClick={handleMapClick}>
                <MapIcon className={`stroke-dark_white h-8 w-8 sm:h-10 sm:w-10 ${activeButton === 'map' ? 'stroke-ore' : ''}`} />
            </Button>

            <Button onClick={handleCalendarClick}>
                <CalendarIcon className={`stroke-dark_white h-8 w-8 sm:h-10 sm:w-10 ${activeButton === 'calendar' ? 'stroke-ore' : ''}`} />
            </Button>

            <Button onClick={handleGoingClick} className={`text-dark_white rounded-full p-3 font-normal font-bevan text-[20px] sm:text-[24px] ${activeButton === 'go!' ? 'text-cities' : ''}`} >
                go!
            </Button>

            <Button onClick={handleFavsClick}>
                <HeartIcon className={`h-8 w-8 sm:h-10 sm:w-10 stroke-dark_white ${activeButton === 'favs' ? 'stroke-ore' : ''}`} />
            </Button>
        </footer>
    )
}