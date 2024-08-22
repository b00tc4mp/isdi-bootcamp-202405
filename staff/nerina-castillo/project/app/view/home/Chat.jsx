import { useEffect, useState } from 'react'
import logic from '../../logic'
import formatTime from '../../util/formatTime.js'
import Button from '../library/Button'
import Time from '../library/Time'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Input from '../library/Input.jsx'
import Image from '../library/Image'
import Avatar from './Avatar'

export default function Chat({ chatId, onMessageSent }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [confirmMessage, setConfirmMessage] = useState(null)

    // useEffect(() => {
    //     const loadMessages = () => {
    //         logic.getMessages(chatId)
    //         .then(loadMessages => {
    //             setMessages(loadMessages)
    //         })
    //         .catch(error => {
    //             console.error(error)

    //             alert(error.message)
    //         })
    //     }
    //     loadMessages()
    // }, [chatId])

    // const handleSendMessage = () => {
    //     if(newMessage.trim() === '') return

    //     logic.sendMessage(chatId, newMessage)
    //     .then(() => {
    //         setNewMessage('')

    //         return logic(getMessages(chatId))
    //     })
    //     .catch(error => {
    //         console.error(error)

    //         alert(error.message)
    //     })
    // }

    return <Container>
        <Container>
            {messages.map(message => <Container
                hey={message.id}
            >
                <Avatar url={message.author.avatar} />
                <Container>
                    <Paragraph>{message.text}</Paragraph>
                    <Time>{formatTime(new Date(message.date))}</Time>
                </Container>
            </Container>
            )}
        </Container>
        <Container>
            <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            {/* <Button onClick={handleSendMessage}>send</Button> */}
        </Container>
        {isChatOpen && (
            <Chat chatId={user.chatId} onMessageSent={() => {/* lógica adicional si es necesario */ }} />
        )}
    </Container>
}