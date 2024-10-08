import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logic from '../../logic'
import Button from '../library/Button'
import Image from '../library/Image'

export default function Header({ onHomeClick, onCalendarClick }) {
    const navigate = useNavigate()

    const handleHomeClick = () => onHomeClick()

    const handleCalendarSearch = () => onCalendarClick()

    const handleMenuClick = () => navigate('/menu')

    return <header className='fixed start-0 top-0 w-full flex justify-around py-4 px-0 z-10 bg-slate-800 text-slate-300 border-b border-slate-300'>
        <Button onClick={handleHomeClick}>
            <Image src='./home.png' className='w-[30px] h-[30px]' />
        </Button>

        <Button onClick={handleCalendarSearch}>
            <Image src='./calendar.png' className='w-[30px] h-[30px]' />
        </Button>
        <Button onClick={handleMenuClick}>
            <Image src='./menu.png' className='w-[30px] h-[30px]' />
        </Button>
    </header>
}