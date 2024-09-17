import logic from '../../logic'
import formatTime from '../../util/formatTime'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../library/Button'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Avatar from './Avatar'
import Goldtrack from '../library/Goldtrack'

import Lottie from 'lottie-react'
import LikeOneIconAnimation from '../../public/LikeOneIcon.json'
import LikeTwoIconAnimation from '../../public/LikeTwoIcon.json'
import DislikeOneIconAnimation from '../../public/DislikeOneIcon.json'
import DislikeTwoIconAnimation from '../../public/DislikeTwoIcon.json'
import ChatMailIconAnimation from '../../public/ChatsMailIcono.json'


export default function User({ user, onUserLikeToggled, onUserDislikeToggled, listType }) {

    const [selectedButton, setSelectedButton] = useState(null)
    const [isLooping, setIsLooping] = useState(false)
    const navigate = useNavigate()
    const [chats, setChats] = useState([])


    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
        return new Date(dateString).toLocaleDateString('es-ES', options)
    }

    const handleLikeUserClick = () => {
        setSelectedButton('like')
        try {
            logic.toggleLikeUser(user.id)
                .then(() => onUserLikeToggled())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleDislikeUserClick = () => {
        setSelectedButton('dislike')
        try {
            logic.toggleDislikeUser(user.id)
                .then(() => onUserDislikeToggled())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const CreateNewChat = () => {
        try {
            logic.createChat(user.id)
                .then(() => setChat(chats))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCreateNewChat = (chatId) => navigate(`/chats/${chatId}`)

    const handleMouseEnter = () => {
        setIsLooping(true)
    }

    const handleMouseLeave = () => {
        setIsLooping(false)
    }

    return (
        <article className="min-w-full shadow-xl p-2 rounded-lg transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-cyan-950 via-gray-900 to-cyan-900">

            <Container className="flex flex-row items-center gap-1">
                <Avatar url={user?.avatar || 'default-avatar.png'} className="w-10 h-10" />

                <Heading level="5" className="text-sm font-semibold  text-orange-400 flex gap-3">
                    {user.username}
                </Heading>

                {listType === 'matchList' && (
                    <Button
                        onClick={() => handleCreateNewChat(user.id)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="w-6 h- flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                        <Lottie animationData={ChatMailIconAnimation} loop={false} className="w-full h-full" />
                    </Button>
                )}

            </Container>

            <Image src={user.image} className="w-full rounded-md shadow-md my-2" />

            {user.role === 'project' ? (
                <Container className="flex-col min-w-full gap-4 mt-6 bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-900 p-6 shadow-md w-full max-w-sm rounded-lg">
                    <Paragraph className="text-2xl font-bold text-yellow-400 text-center">
                        {user.title}
                    </Paragraph>
                    <Paragraph className="text-xs text-gray-300 mb-1 text-center">
                        Category #: {user.category}
                    </Paragraph>

                    <Paragraph className="text-xs text-gray-300 text-center">
                        Budget $: {user.budgetGoal}
                    </Paragraph>

                    <Paragraph className="text-sm text-gray-300 mb-1 text-center">
                        {user.description}
                    </Paragraph>

                    <Paragraph className="text-sm text-gray-300 mb-1 text-center">
                        {formatDate(user.startDate)} - {formatDate(user.endDate)}
                    </Paragraph>

                    <Goldtrack className="text-sm text-gray-300 mb-1 text-center">
                        startDate={user.startDate} endDate={user.endDate}
                    </Goldtrack>
                </Container>


            ) : (


                <Container className="flex-col min-w-full gap-4 mt-6 bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-900 p-6 shadow-md w-full max-w-sm rounded-lg">
                    <Paragraph className="text-sm text-gray-300 mb-1 text-center">
                        {user.username}
                    </Paragraph>
                    <Paragraph className="text-sm text-gray-300 mb-1 text-center">
                        {user.description}
                    </Paragraph>
                </Container>
            )}


            {listType !== 'matchList' && (

                <Container className="flex flex-col items-center gap-6 mt-4 shadow-xl text-white p-6 rounded-lg">
                    <div className="flex justify-between w-full gap-4">
                        <Button
                            onClick={handleDislikeUserClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="flex items-center justify-center w-16 h-16 text-2xl bg-opacity-20 bg-cyan-500 text-gray-500 rounded-full shadow-lg transition-transform transform scale-100 duration-300 hover:scale-200">
                            <Lottie
                                animationData={selectedButton === 'Dislike' ? DislikeTwoIconAnimation : DislikeOneIconAnimation}
                                loop={false}
                                className="w-full h-full" />
                        </Button>

                        <Button
                            onClick={handleLikeUserClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="flex items-center justify-center w-16 h-16 text-2xl bg-opacity-20 bg-cyan-500 text-gray-500 rounded-full shadow-lg transition-transform transform scale-100 duration-300 hover:scale-200">
                            <Lottie
                                animationData={selectedButton === 'like' ? LikeTwoIconAnimation : LikeOneIconAnimation}
                                loop={false}
                                className="w-full h-full" />
                        </Button>
                    </div>
                </Container>
            )}

            <Time>{formatTime(new Date(user.date))}</Time>
        </article >
    )
}
