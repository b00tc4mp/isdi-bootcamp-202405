import React from 'react'

import Container from '../library/Container.jsx'
import Heading from '../library/Heading.jsx'

export default function Header() {
    return <header className='bg-teal-100 fixed left-0 top-0 w-full flex items-center gap-2 p-2'>
        <Container className='flex-shrink'>
            <img src='../../../logoExoticus.png' alt='logo exoticus' className='h-[3rem] w-auto' />
        </Container>
        <Container>
            <Heading className=' text-xl font-bold text-black italic m-1'>Exoticus</ Heading>
        </Container>

    </header>
}