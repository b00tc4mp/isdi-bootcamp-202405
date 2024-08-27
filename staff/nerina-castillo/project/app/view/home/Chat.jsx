import { useEffect, useState } from 'react'
import logic from '../../logic'
import formatTime from '../../util/formatTime.js'
import Button from '../library/Button'
import Time from '../library/Time'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Input from '../library/Input.jsx'
import Avatar from './Avatar'
import Heading from '../library/Heading.jsx'
import Image from '../library/Image'

export default function Chat({ chatId, userId, onMessageSent }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const loadMessages = () => {
            try {
                logic.getMessages(chatId)
                    .then(messages => {
                        setMessages(messages)

                        setTimeout(() => {
                            loadMessages()
                        }, 1000)
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

        loadMessages()
    }, [chatId])

    const handleSendMessage = () => {
        try {
            if (newMessage.trim() === '') return

            logic.sendMessage(chatId, newMessage)
                .then(() => {
                    setNewMessage('')

                    onMessageSent()

                    return logic.getMessages(chatId)
                })
                .then(updatedMessages => {
                    setMessages(updatedMessages)
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

    return <Container className='bg-slate-300 flex flex-col text-slate-700 rounded-lg mb-2'>
        <Container className='flex-1 overflow-y-auto'>
            {messages.map(message => (
                <Container
                    key={message.id}
                    className={`p-2 flex ${message.author.id === userId ? 'justify-start' : 'justify-end'}`}
                >
                    <Container
                        className={`max-w-[70%] flex flex-col bg-slate-200 rounded-xl m-2 ${message.author.id === userId ? 'items-end' : 'items-start'}`}
                    >
                        <Container className={`flex items-center m-2 ${message.author.id === userId ? 'flex-row-reverse' : ''}`}>
                            <Avatar url={message.author.avatar} />
                            <Heading className={`font-semibold text-slate-600 ml-2 ${message.author.id === userId ? 'mr-2 ml-0' : ''}`}>
                                {message.author.username}
                            </Heading>
                        </Container>
                        <Container className={`ml-3 mr-3 ${message.author.id === userId ? 'text-right' : 'text-left'} break-words`}>
                            <Paragraph className='break-words max-w-[55%]'>
                                {message.text}
                            </Paragraph>
                            <Time className='text-xs text-gray-500'>
                                {formatTime(new Date(message.date))}
                            </Time>
                        </Container>
                    </Container>
                </Container>
            ))}
        </Container>
        <Container className='p-2 flex items-center'>
            <Input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className='flex-1 mr-2 border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none'
            />
            <Button onClick={handleSendMessage} className='self-end'>
                <Image className='w-[20px] h-[20px]' src='./chat.png' />
            </Button>
        </Container>
    </Container>
}