import { useEffect, useState } from 'react'
import logic from '../../logic'
import Avatar from './Avatar'
import Button from '../library/Button'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Chat from './Chat'

export default function User({ user, onUserFollowToggled }) {
    const [isFollowing, setIsFollowing] = useState(user.following)
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        setIsFollowing(user.following)
    }, [user])

    const handleFollowUserClick = () => {
        try {
            logic.toggleFollowUser(user.id)
                .then(() => {
                    setIsFollowing(prev => !prev)
                    onUserFollowToggled()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.confirmMessage)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleToggleChat = () => setIsChatOpen(prev => !prev)

    return <article className='border-b border--b border-gray-500 ml-2 mr-2'>
        <Container className='flex justify-between items-center m-[.5rem]'>
            <Container className='flex items-center gap-1'>
                <Avatar url={user.avatar} alt={`${user.username}'s avatar`} />
                <Heading className='font-bold text-slate-400 text-lg'>{user.username}</Heading>
            </Container>

            <Container className='flex items-center'>
                <Button onClick={handleFollowUserClick}>
                    <Image className='w-[20px] h-[20px]' src={isFollowing ? './unfollow.png' : './follow.png'} />
                </Button>
                <Button onClick={handleToggleChat} className="ml-2">
                    chat
                    {/* <Image className='w-[20px] h-[20px]' src='./chat.png' alt='Open Chat' /> */}
                </Button>
            </Container>

        </Container>
    </article>
}