import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useContext from '../context.js'

import logic from '../../logic'
import formatTime from '../../util/formatTime.js'

import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Image from '../library/Image'
import Container from '../library/Container'
import Heading from '../library/Heading'

export default function Chats() {
    const [chats, setChats] = useState([])
    const navigate = useNavigate()
    const { alert } = useContext()

    useEffect(() => {

        let intervalId

        loadChats()
            .then(() => {
                intervalId = setInterval(() => {
                    loadChats()

                }, 5000)
            })

        return () => clearInterval(intervalId)
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

    const handlePrivateChatClick = (chatId) => navigate(`/chats/${chatId}`)

    return <>
        <Container className="flex justify-center items-center h-20">
            <Heading className="text-[#000000] text-[20px] font-bold">QueerCareChats</Heading>
        </Container>

        <Container className="flex flex-col justify-center items-center space-y-4">
            {chats.length === 0 ? (
                <Paragraph className="text-center text-gray-500">No chats yet.</Paragraph>
            ) : (
                chats.map(chat => (
                    <Container key={chat.id} className="w-full flex justify-center">
                        <Container className="flex items-center justify-between border shadow-lg rounded-xl w-96 h-20 p-4">

                            <Image className="w-[60px] h-[60px] rounded-xl" src={!(chat.participant.avatar) ? './profileIcon.svg' : chat.participant.avatar} />

                            <Paragraph className="text-sm text-gray-400">Last message: {formatTime(new Date(chat.lastMessage.date))} ago</Paragraph>

                            <Button onClick={() => handlePrivateChatClick(chat.id)}>
                                <Image className="h-[30px] w-[30px]" src="./chatIcon.svg" />
                            </Button>
                        </Container>
                    </Container>
                ))
            )}
        </Container>
    </>
}