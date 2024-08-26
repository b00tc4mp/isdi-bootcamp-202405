import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineRollback as GoBackIcon } from 'react-icons/ai'

import Container from '../library/Container'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function NotFoundError() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleGoBack = () => {
        const canGoBack = location.key !== 'default'
        const href = canGoBack ? -1 : '/'

        navigate(href)
    }

    return <Container className='flex flex-col justify-center items-center gap-4 w-full h-[87vh]' >
        <Paragraph className='dark:text-white text-4xl font-bold'>ERROR! ERROR!</Paragraph>
        <Image src='../../images/space_invaders_icon.svg' className='w-[60%] h-auto dark:invert' />
        <Paragraph className='dark:text-white text-4xl font-bold'>PAGE NOT FOUND</Paragraph>
        <Button className='bg-blue-500 rounded p-2' onClick={handleGoBack}><GoBackIcon className='w-16 h-16 dark:text-white' /></Button>
    </Container>
}