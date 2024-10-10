import { useState, useEffect } from 'react'
import Button from '../library/Button'
import Container from '../library/Container'
import Image from '../library/Image'
import logic from '../../logic'

import { useNavigate } from 'react-router-dom'
import Paragraph from '../library/Paragraph'

export default function Footer({ isAuthenticated, refreshCart }) {
    useEffect(() => {

    }, [isAuthenticated, refreshCart])

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

    return <footer className='fixed bottom-0 left-0 w-full flex justify-center bg-lightGreen p-0 shadow-[0px_-1px_1px_lightgray]'>
        <Container className='flex flex-grow p-0 justify-between items-end pb-0.5 px-24'>

            <Button onClick={handleLastSearchClick} className='flex flex-col items-center space-y-0'>
                <Paragraph className='font-semibold m-0'>Last</Paragraph>
                <Image src='/icons/search.svg' alt='search icon' className='h-[30px] w-[30px]' />
            </Button>

            {isAuthenticated && (
                <Button onClick={handleAddProductClick} className='flex flex-col items-center space-y-1'>
                    <Image src='/icons/add-circle-outline.svg' alt='add icon' className='h-[30px] w-[30px]' />
                </Button>
            )}

            <Button onClick={handleHomeClick} className='flex flex-col items-center space-y-1'>
                <Image src='/icons/home.svg' alt='home icon' className='h-[30px] w-[30px]' />
            </Button>

            {isAuthenticated && (
                <Button onClick={handleProductListClick} className='flex flex-col items-center space-y-1'>
                    <Image src='/icons/list.svg' alt='list icon' className='h-[30px] w-[30px]' />
                </Button>
            )}

            <Button onClick={handleCartClick} className='flex flex-col items-center space-y-0 p-0'>
                {logic.countCartProducts() !== 0 && <Paragraph className='font-semibold items-center m-0'>{logic.countCartProducts()}</Paragraph>}
                <Image src='/icons/cart.svg' alt='cart icon' className='h-[30px] w-[30px]' />

            </Button>

        </Container>
    </footer>

}