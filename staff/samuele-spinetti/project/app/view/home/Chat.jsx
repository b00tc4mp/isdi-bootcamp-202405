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
import Message from './Message'


export default function Chat() {
    const [messages, setMessages] = useState([])
    const [userId, setUserId] = useState(null)
    const [avatar, setAvatar] = useState(null)
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

                    loadMessages(chat.participant.id)
                        .then(() => {
                            intervalId = setInterval(() => {
                                loadMessages(chat.participant.id)
                            }, 5000)
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
    }, [])

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
                .then(messages => {
                    setMessages(messages)

                })
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

    return (
        <>
            <Container className="fixed w-screen h-screen top-0 left-0 z-[9999] bg-black bg-opacity-60"></Container>

            <Container className="fixed w-screen h-screen top-0 left-0 z-[10000] flex flex-col justify-between ">
                <Container className="flex items-center h-20 justify-between p-4 bg-gradient-to-br from-green-400 to-fuchsia-500  shadow-md z-[10001]">
                    <Button onClick={handleClosePrivateChatClick} className="flex items-center">
                        <Image src="/arrowLeftIcon.svg" className="h-[35px] w-[35px]" />
                    </Button>
                    <Container className="flex items-center">
                        <Image src={(!avatar || avatar === null) ? "/profileIcon.svg" : avatar} className="w-[40px] h-[40px] rounded-xl" />
                        <Heading level="4" className="ml-2 text-gray-600">Anonymous</Heading>
                    </Container>
                </Container>

                <Container className="flex flex-col h-screen w-screen overflow-y-auto p-4 bg-gray-100">
                    {messages.length === 0
                        ? <Paragraph className="text-center text-gray-500">No messages yet.</Paragraph>
                        : messages.map(message => <Message key={message.id} message={message} />)
                    }

                    <div ref={messagesEndRef} />
                </Container>

                <Container className="p-4 h-24 bg-gradient-to-br from-green-400 to-fuchsia-500  shadow-md z-[10001]">
                    <Form onSubmit={handleSendPrivateMessageSubmit} className="flex items-center">
                        <textarea
                            name="private-message-input"
                            rows="2"
                            className="rounded-lg w-full h-14 border border-gray-300 bg-gray-100 text p-2"
                            placeholder="Write here..."
                        ></textarea>
                        <Button type="submit" className="ml-2">
                            <Image src="/arrowIcon.svg" className="h-[30px] w-[30px]" />
                        </Button>
                    </Form>
                </Container>
            </Container>
        </>
    )
}