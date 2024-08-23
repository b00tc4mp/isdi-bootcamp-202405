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

export default function Chat({ chatId, onMessageSent }) {
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
                    });
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

    return <Container>
        <Container>
            {messages.slice().reverse().map(message => <Container
                key={message.id}
            >
                <Container>
                    <Avatar url={message.author.avatar} />
                    <Heading>{message.author.username}</Heading>
                </Container>
                <Container>
                    <Paragraph>{message.text}</Paragraph>
                    <Time>{formatTime(new Date(message.date))}</Time>
                </Container>
            </Container>
            )}
        </Container>
        <Container>
            <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <Button onClick={handleSendMessage}>send</Button>
        </Container>

    </Container>
}