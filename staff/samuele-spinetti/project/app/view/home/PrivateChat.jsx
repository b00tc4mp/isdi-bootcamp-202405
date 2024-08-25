import { useState, useEffect } from 'react'

import logic from '../../logic'

import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Form from '../library/Form'

export default function PrivateChat({ targetUser, onClosePrivateChatClicked }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        loadMessages()
    }, [])

    const handleSendPrivateMessageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const privateMessageInput = form['private-message-input']

        const message = privateMessageInput.value

        try {
            logic.createChat(targetUser.id)
                .then(chatId => {
                    if (chatId)

                        return logic.sendMessage(chatId, message)
                            .then(() => {
                                loadMessages()

                                privateMessageInput.value = ''
                            })
                            .catch(error => {
                                console.error(error)

                                alert(error.message)
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

    }

    const handleClosePrivateChatClick = () => onClosePrivateChatClicked()

    const loadMessages = () => {
        try {
            logic.getChatMessages(targetUser.id)
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

    return <>
        <Container className="fixed w-screen top-0 left-0 h-screen bg-black opacity-60"></Container>

        <Container className="fixed w-screen top-0 left-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-white h-[46rem] w-[25rem] rounded-xl flex flex-col justify-center items-center">
                <Container className="flex flex-row items-center justify-between gap-40">
                    <Container className="flex flex-row items-center justify-start">
                        <Image src={!targetUser?.avatar ? "./profileIcon.svg" : targetUser.avatar} className="w-[30px] h-[30px] rounded-lg" />
                        <Heading level="4" className="m-2 text-gray-600">Anonymous</Heading>
                    </Container>
                    <Container className="flex flex-row">
                        <Button onClick={handleClosePrivateChatClick} className="border w-14 h-8 border-gray-300 bg-white rounded-lg" type="reset">Close</Button>
                    </Container>
                </Container>
                <Container className="flex flex-col h-[44rem] w-[22rem] border rounded-xl overflow-y-auto p-4">
                    {messages.length === 0 ? (
                        <Paragraph className="text-center text-gray-500">No messages yet.</Paragraph>
                    ) : (
                        messages.map(message => (
                            (message.author === logic.getUserId)
                                ? <Container
                                    key={message.id}
                                    className="flex p-2 mb-2 rounded-lg max-w-[70%] bg-green-300 text-black self-end"
                                ><Paragraph>{message.message}</Paragraph></Container>
                                : <Container
                                    key={message.id}
                                    className="flex p-2 mb-2 rounded-lg max-w-[70%] bg-fuchsia-200 text-black self-start"
                                >
                                    <Paragraph>{message.message}</Paragraph>
                                </Container> //TODO
                        ))
                    )}
                </Container>
                <Container className="flex flox-row p-2 gap-3">
                    <Form onSubmit={handleSendPrivateMessageSubmit}>
                        <textarea name="private-message-input" row="1" id="" className="rounded-lg w-[21rem] h-10 border-black bg-gray-200 text p-2" placeholder="Write here..."></textarea>
                        <Button type="submit"><Image src="./arrowIcon.svg" className="h-[30px] w-[30px] fill-white"></Image></Button>
                    </Form>
                </Container>
            </Container>
        </Container >
    </>
} 