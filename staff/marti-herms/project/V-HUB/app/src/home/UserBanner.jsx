import Container from '../library/Container'
import Avatar from '../library/Avatar'
import Paragraph from '../library/Paragraph'

import useContext from '../context'

import logic from '../../logic'

export default function GameBanner({ user, onInteraction, onUserClick }) {
    const { alert } = useContext()

    const handleUserClick = () => {
        onUserClick(user.id)
    }

    const handleFollowUser = () => {
        try {
            logic.toggleFollowUser(user.id)
                .then(() => onInteraction())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className='flex flex-row items-center border border-solid border-slate-700 dark:bg-black'>
        <button className='bg-transparent border-0' onClick={handleUserClick}>
            <Container className='flex flex-col'>
                <Container className='flex flex-row items-center'>
                    <Avatar className='w-2/12 h-2/12' src={user.avatar} />
                    <Paragraph>{user.username}</Paragraph>
                </Container>
            </Container>
        </button>
        <Container className='flex flex-col gap-2 mr-2'>
            <button className='bg-gray-500 rounded' onClick={handleFollowUser}>{user.following ? 'Unfollow' : 'Follow'}</button>
        </Container>
    </article>
}