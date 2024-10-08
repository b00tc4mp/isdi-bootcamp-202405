import { useNavigate } from 'react-router-dom'
import logic from '../../logic'
import AllLists from './AllLists'
import Button from '../library/Button'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'

export default function Menu({ refreshStamp, isListVisible, setListVisibility }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        try {
            logic.logoutUser()
            navigate('/login')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <Container className='bg-slate-700 text-slate-300 min-h-screen p-2'>
        <Heading className='mt-[60px] text-2xl font-bold mb-2'>settings</Heading>
        <AllLists refreshStamp={refreshStamp} setListVisibility={setListVisibility} />

        {!isListVisible && (
            <Container>
                <Button onClick={handleLogout}>
                    <Image src='./logout.png' className='w-[20px] h-[20px] mt-2' />
                </Button>
            </Container>
        )}
    </Container>
}