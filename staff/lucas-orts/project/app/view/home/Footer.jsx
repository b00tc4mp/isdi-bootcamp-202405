import { useState, useEffect } from 'react'
import Button from '../library/Button'
import Container from '../library/Container'
import Image from '../library/Image'
import logic from '../../logic'

import { useNavigate } from 'react-router-dom'

export default function Footer({ isAuthenticated }) {
    useEffect(() => {

    }, [isAuthenticated])

    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleLastSearchClick = () => {
        navigate('/lastsearch')
    }

    const handleAddProductClick = () => {
        navigate('/product')
    }

    const handleProductListClick = () => {
        navigate('/products')
    }
    const handleCartClick = () => {
        navigate('/cart')
    }

    return <footer className='fixed bottom-0 left-0 w-full flex justify-center bg-lightGreen p-[.5rem_0] shadow-[0px_-1px_1px_lightgray]'>
        <Container className='flex flex-grow justify-between items-center px-24'>
            <Button onClick={handleLastSearchClick}>
                <Image src='/icons/search.svg' alt='search icon' className='h-[30px] w-[30px]' />
            </Button>
            {isAuthenticated && (
                <Button onClick={handleAddProductClick}>
                    <Image src='/icons/add-circle-outline.svg' alt='add icon' className='h-[30px] w-[30px]' />
                </Button>
            )}

            <Button onClick={handleHomeClick}>
                <Image src='/icons/home.svg' alt='home icon' className='h-[30px] w-[30px]' />
            </Button>

            {isAuthenticated && (
                <Button onClick={handleProductListClick}>
                    <Image src='/icons/list.svg' alt='list icon' className='h-[30px] w-[30px]' />
                </Button>
            )}
            <Button onClick={handleCartClick}>
                <Image src='/icons/cart.svg' alt='cart icon' className='h-[30px] w-[30px]' />
            </Button>



        </Container>
    </footer>

}