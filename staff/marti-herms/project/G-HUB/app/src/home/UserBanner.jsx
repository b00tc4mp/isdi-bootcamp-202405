import { RiUserFollowLine as FollowIcon, RiUserUnfollowLine as UnfollowIcon } from 'react-icons/ri'
import { IoIosSend as SendIcon } from 'react-icons/io'


import Container from '../library/Container'
import Avatar from '../library/Avatar'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

import useContext from '../context'

import logic from '../../logic'

import defaultAvatar from '../../images/defaultAvatar.svg'
import extractPayloadFromToken from '../../util/extractPayloadFromToken'

export default function UserBanner({ user, onInteraction, onUserClick, onChatClick }) {
    const { alert } = useContext()

    const { sub: currentUserId } = extractPayloadFromToken(sessionStorage.token)

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

    const handleOpenChat = () => {
        onChatClick(user.id)
    }

    return <article className='flex flex-row w-full items-center justify-between p-3 border-y border-solid border-slate-700 dark:bg-black'>
        <Button className='bg-transparent border-0' onClick={handleUserClick}>
            <Container className='flex flex-col'>
                <Container className='flex flex-row items-center'>
                    <Avatar className='w-2/12 h-2/12' url={user.avatar || defaultAvatar} />
                    <Paragraph className='text-xl font-bold'>{user.username}</Paragraph>
                </Container>
            </Container>
        </Button>
        {user.id !== currentUserId && <Container className='flex flex-row gap-2 mr-2 h-full'>
            <Button onClick={handleFollowUser}>{user.followed ? <UnfollowIcon className='w-8 h-8 dark:text-white' /> : <FollowIcon className='w-8 h-8 dark:text-white' />}</Button>
            <Button className='h-[40px]' onClick={handleOpenChat} ><SendIcon className='w-8 h-8 ml-0.5 mt-1 text-white' /></Button>
        </Container>}
    </article>
}