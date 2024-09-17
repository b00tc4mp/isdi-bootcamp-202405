import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useContext from '../context.js'

import logic from '../../logic'
import Lottie from 'lottie-react'
import ChatMailIconoAnimation from '../../public/ChatsMailIcono.json'

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
        <Container className="flex justify-center items-center  bg-cyan-900 w-full h-full">
            <Heading className="text-orange-500 text-[20px] font-bold">Ratch⚡️Messages</Heading>
        </Container>

        <Container className="flex flex-col w-full h-full justify-center items-center space-y-4">
            {chats.length === 0 ? (
                <Paragraph className="text-center text-gray-400 ">No chats yet.</Paragraph>
            ) : (
                chats.map(chat => (
                    <Container key={chat.id} className="w-full flex justify-center">
                        <Container className="flex items-center justify-between border shadow-lg rounded-xl w-96 h-20 p-4">

                            <Image className="w-[60px] h-[60px] rounded-xl" src={!(chat.participant.avatar) ? './profileIcon.svg' : chat.participant.avatar} />

                            <Button onClick={() => handlePrivateChatClick(chat.id)} className="w-8 h-8 flex items-center justify-center bg-transparent border border-orange-400 rounded-lg shadow-lg transition-transform transform hover:scale-95">
                                <Lottie animationData={ChatMailIconoAnimation} loop={false} className="w-full h-full" />
                            </Button>
                        </Container>
                    </Container>
                ))
            )}
        </Container>
    </>
}