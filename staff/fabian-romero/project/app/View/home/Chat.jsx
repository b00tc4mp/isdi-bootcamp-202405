import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useContext from '../context.js'
import logic from '../../logic'

import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Form from '../library/Form'
import Message from '../home/Message.jsx'

import Lottie from 'lottie-react'
import SendMessageIconAnimation from '../../public/SendMessageIcon.json'
import BackIconAnimation from '../../public/BackIcon.json'

export default function Chat() {
    const [messages, setMessages] = useState([])
    const [participantName, setParticipantName] = useState(null)
    const [userId, setUserId] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [isLooping, setIsLooping] = useState(false)
    const navigate = useNavigate()
    const { alert } = useContext()
    const messagesEndRef = useRef(null)
    const { chatId } = useParams()

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    useEffect(() => {
        let intervalId

        try {
            logic.getChatParticipant(chatId)
                .then(chat => {
                    setUserId(chat.participant.id)
                    setAvatar(chat.participant.avatar)
                    setParticipantName(chat.participant.name)

                    loadMessages(chat.participant.id)
                        .then(() => {
                            intervalId = setInterval(() => {
                                loadMessages(chat.participant.id)
                            }, 3000)
                        })
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }

        return () => clearInterval(intervalId)
    }, [chatId])

    const handleSendPrivateMessageSubmit = event => {
        event.preventDefault()

        const form = event.target
        const privateMessageInput = form['private-message-input']
        const message = privateMessageInput.value

        try {
            logic.sendMessage(chatId, message)
                .then(() => {
                    loadMessages(userId)
                    privateMessageInput.value = ''
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

    const handleClosePrivateChatClick = () => navigate('/chats')

    const loadMessages = (participantId) => {
        try {
            return logic.getChatMessages(participantId)
                .then(messages => setMessages(messages))
                .catch(error => {
                    console.error(error)
                    if (error instanceof NotFoundError) setMessages([])
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleMouseEnter = () => {
        setIsLooping(true)
    }

    const handleMouseLeave = () => {
        setIsLooping(false)
    }

    return <>
        <Container className="fixed w-full top-0 left-0 z-[9999] bg-cyan-900 h-full "></Container>

        <Container className="fixed w-screen h-screen top-0 left-0 z-[10000] flex flex-col justify-between">

            <Container className="fixed left-0 top-0 w-full flex justify-between items-center bg-gradient-to-b from-cyan-950 via-gray-900 to-cyan-900 p-2 box-border shadow-lg rounded-b-md bg-opacity-70 text-black z-[10001]">

                <Button
                    onClick={handleClosePrivateChatClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="w-8 h-8 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                    <Lottie animationData={BackIconAnimation} loop={isLooping} className="w-full h-full" />
                </Button>

                <Container className="flex items-center gap-3">
                    <Image src={(!avatar || avatar === null) ? "/profileIcon.svg" : avatar}
                        className="w-[40px] h-[40px] rounded-xl" />
                    <Heading className="flex items-center gap-3">
                        <p className="text-lg font-medium text-orange-400">{participantName} 's Ratch⚡️!</p>
                    </Heading>
                </Container>
            </Container>

            <Container className="flex flex-col h-screen w-screen overflow-y-auto p-4 bg-gray-100 mt-20">
                {messages.length === 0
                    ? <Paragraph className="text-center text-gray-500">No messages yet.</Paragraph>
                    : messages.map(message => <Message key={message.id} message={message} />)
                }
                <div ref={messagesEndRef} />
            </Container>

            <Container className="fixed bottom-0 left-0 w-full flex justify-between items-center bg-gradient-to-b from-cyan-950 via-gray-900 to-cyan-900 p-2 box-border shadow-lg rounded-t-md bg-opacity-70 text-black z-[10001]">

                <Form onSubmit={handleSendPrivateMessageSubmit} className="flex items-center w-full">
                    <textarea
                        name="private-message-input"
                        rows="2"
                        className="rounded-lg w-full h-14 border border-gray-300 bg-gray-100 text p-2"
                        placeholder="Write here..."
                    ></textarea>
                    <Button
                        type="submit"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="w-8 h-8 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                        <Lottie animationData={SendMessageIconAnimation} loop={false} className="w-full h-full" />
                    </Button>
                </Form>
            </Container>
        </Container >
    </>
}
