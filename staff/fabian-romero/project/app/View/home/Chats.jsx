import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useContext from '../context.js'

import logic from '../../logic'
import Lottie from 'lottie-react'
import ChatMailIconoAnimation from '../../public/ChatsMailIcono.json'
import TrashIconAnimation from '../../public/TrashIcono.json'

import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Image from '../library/Image'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Confirm from '../common/Confirm.jsx'


export default function Chats() {
    const [isLooping, setIsLooping] = useState(false)
    const [chats, setChats] = useState([])
    const [chatConfirmMessage, setChatConfirmMessage] = useState(null)
    const [chatToDelete, setChatToDelete] = useState(null)
    const navigate = useNavigate()
    const { alert } = useContext()

    useEffect(() => {
        loadChats()
    }, [])

    const loadChats = () => {
        try {
            return logic.getAllChats()
                .then(chats => setChats(chats))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleDeleteChat = (chatId) => {
        setChatConfirmMessage('Delete chat?')
        setChatToDelete(chatId)
    }

    const handleConfirmDeleteChat = () => {
        if (!chatToDelete) return

        try {
            return logic.deleteChatById(chatToDelete)
                .then(() => {
                    loadChats()
                    setChatConfirmMessage(null)
                    setChatToDelete(null)
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleDeleteChatCancel = () => {
        setChatConfirmMessage(null)
        setChatToDelete(null)
    }

    const handleMouseEnter = () => {
        setIsLooping(true)
    }

    const handleMouseLeave = () => {
        setIsLooping(false)
    }

    const handlePrivateChatClick = (chatId) => navigate(`/chats/${chatId}`)

    return (chats &&
        <Container className="flex flex-col justify-between bg-transparent w-full h-full p-4 space-y-4">
            <Container className="flex justify-center items-center">
                <Heading className="text-orange-500 text-[20px] font-normal">Ratch⚡️Messages</Heading>
            </Container>

            <Container className="flex flex-col rounded-lg w-full p-4 space-y-4 overflow-y-auto">
                {chats.length === 0 ? (
                    <Paragraph className="text-center text-gray-400">No chats yet.</Paragraph>
                ) : (
                    chats.map(chat => (
                        <Container key={chat.id} className="w-full flex flex-col justify-center">
                            <Container className="flex items-center justify-between border border-orange-400 shadow-lg rounded-xl w-full h-20 p-4">
                                <Image className="w-[40px] h-[40px] rounded-xl" src={!(chat.participant.avatar) ? './profileIcon.svg' : chat.participant.avatar} />

                                <Paragraph className="ml-4 font-normal self-center text-white">{chat.participant.username}</Paragraph>
                                <Container>
                                    <Button onClick={() => handlePrivateChatClick(chat.id)} className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                                        <Lottie animationData={ChatMailIconoAnimation} loop={false} className="w-full h-full" />
                                    </Button>

                                    <Button
                                        onClick={() => handleDeleteChat(chat.id)}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        className="w-6 h-6 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                                        <Lottie animationData={TrashIconAnimation} loop={isLooping} className="w-full h-full" />
                                    </Button>
                                </Container>
                            </Container>
                        </Container>
                    ))
                )}
            </Container>
            {chatConfirmMessage && (<Confirm message={chatConfirmMessage} onAccept={handleConfirmDeleteChat} onCancel={handleDeleteChatCancel} />)}
        </Container>
    )
}
