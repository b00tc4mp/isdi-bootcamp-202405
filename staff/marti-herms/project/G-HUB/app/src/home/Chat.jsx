import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoIosSend as SendIcon } from 'react-icons/io'

import Container from '../library/Container'
import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'
import Avatar from '../library/Avatar'
import Paragraph from '../library/Paragraph'

import Message from './Message'

import useContext from '../context'
import extractPayloadFromToken from '../../util/extractPayloadFromToken'

import defaultAvatar from '../../images/defaultAvatar.svg'

import logic from '../../logic'

export default function Chat({ onOpenChat }) {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messageRef = useRef()
    const { alert } = useContext()

    const { sub: loggedInUser } = extractPayloadFromToken(sessionStorage.token)

    const { userId } = useParams()

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages.length])

    useEffect(() => {
        try {
            if (userId === loggedInUser) {
                logic.getUserChats(userId)
                    .then(chats => {
                        const promises = chats.map(chat => {
                            const index = chat.participants[0] === userId ? 1 : 0

                            return logic.getUser(chat.participants[index])
                        })

                        return Promise.all(promises)
                    })
                    .then(users => setUsers(users))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } else {
                logic.getUser(userId)
                    .then(user => {
                        setUser(user)

                        return logic.openChat(userId)
                    })
                    .then(chatId => setChat(chatId))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [userId])

    useEffect(() => {
        let intervalId
        if (chat) {
            loadMessages()
            intervalId = setInterval(() => {
                loadMessages()
            }, 1000)
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
                setChat(null)
                setMessages([])
            }
        }
    }, [chat])

    const handleSendMessage = (event) => {
        event.preventDefault()

        const form = event.target

        const messageInput = form['message-input']

        setMessage(messageInput.value)

        console.log(chat)

        try {
            logic.sendMessage(chat, message)
                .then(() => {
                    setMessage('')

                    loadMessages()
                })
                .catch(error => {
                    console.error(error)

                    alert(error)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const loadMessages = () => {
        try {
            logic.getChatMessages(chat)
                .then(messages => setMessages(messages.reverse()))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleOpenChat = (userId) => {
        onOpenChat(userId)
    }

    return <Container className='w-full h-full flex flex-col pb-[110px]' >
        {userId !== loggedInUser ? <>
            <Container className='w-full h-full flex flex-col'>
                {user && <Container className='flex flex-row items-center ml-4 mt-4'>
                    <Avatar className='w-2/12 h-2/12' url={user.avatar || defaultAvatar} />
                    <Paragraph className='text-xl font-bold'>{user.username}</Paragraph>
                </Container>}
                {messages.map(message => <Message key={message.id} message={message} />)}
                <div ref={messageRef} />
            </Container>
            <Form className='fixed w-full h-[50px] bottom-[60px] dark:bg-[#1e1e1e] flex flex-row justify-center items-center gap-2' onSubmit={handleSendMessage}>
                <Input id='message-input' value={message} onChange={handleInputChange} />
                <Button className='bg-blue-800 rounded-full h-[40px] aspect-square' ><SendIcon className='w-8 h-8 ml-0.5 mt-1 text-white' /></Button>
            </Form>
        </> :
            <Container className='flex flex-col items-center w-full h-[50px]'>
                {users.map(user =>
                    <article key={user.id} className='flex flex-row w-full items-center justify-between p-3 border-y border-solid border-slate-700 dark:bg-black'>
                        <Container className='flex flex-row items-center'>
                            <Avatar className='w-2/12 h-2/12' url={user.avatar || defaultAvatar} />
                            <Paragraph className='text-xl font-bold'>{user.username}</Paragraph>
                        </Container>
                        <Button className='h-[40px]' onClick={() => handleOpenChat(user.id)} ><SendIcon className='w-8 h-8 ml-0.5 mt-1 text-white' /></Button>
                    </article>
                )}
            </Container>}
    </Container >
}