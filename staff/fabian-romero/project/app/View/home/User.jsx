import logic from '../../logic'
import formatTime from '../../util/formatTime'
import { useState, useEffect } from 'react'

import Button from '../library/Button'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Avatar from './Avatar'
import Goldtrack from '../library/Goldtrack'

export default function User({ user, onUserFavToggled, onUserLikeToggled, onUserDislikeToggled }) {

    const [selectedButton, setSelectedButton] = useState(null)

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options)
    }

    const handleLikeUserClick = () => {
        setSelectedButton('like')
        try {
            logic.toggleLikeUser(user.id)
                .then(() => onUserLikeToggled())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleDislikeUserClick = () => {
        setSelectedButton('dislike')
        try {
            logic.toggleDislikeUser(user.id)
                .then(() => onUserDislikeToggled())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleFavUserClick = () => {
        try {
            logic.toggleFavUser(user.id)
                .then(() => onUserFavToggled())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return (
        <article className="min-w-full shadow-md dark:bg-gray-600 dark:text-white p-2 rounded-lg transform transition-transform duration-300 ease-in-out">
            <Container className="flex flex-row items-center gap-1">
                <Avatar url={user?.avatar || 'default-avatar.png'} className="w-10 h-10" />

                <Heading level="5" className="text-sm dark:text-white font-semibold">
                    {user.username}
                </Heading>

                <Button
                    onClick={handleFavUserClick}
                    className="px-1 py-0.5 text-xs text-white border border-transparent rounded-md shadow-md transition-transform transform hover:scale-95 hover:bg-cyan-300"
                >
                    {user.fav ? '🔐' : '🔓'}
                </Button>
            </Container>

            <Image src={user.image} className="w-full rounded-md shadow-md my-2" />

            {user.role === 'project' ? (
                <Container className="flex flex-col p-4 bg-white border border-yellow-100 rounded-lg">
                    <Paragraph className="text-2xl font-bold dark:text-white mb-2 text-center">
                        {user.title}
                    </Paragraph>
                    <Paragraph className="text-xs text-gray-600 dark:text-gray-400 mb-1 text-center">
                        Category #: {user.category}
                    </Paragraph>

                    <Paragraph className="text-xs text-gray-600 dark:text-gray-400 text-center">
                        Budget $: {user.budgetGoal}
                    </Paragraph>

                    <Paragraph className="text-sm text-gray-700 dark:text-gray-300 mb-1 text-center">
                        {user.description}
                    </Paragraph>

                    <Paragraph className="text-sm text-gray-700 dark:text-gray-300 mb-1 text-center">
                        {formatDate(user.startDate)} - {formatDate(user.endDate)}
                    </Paragraph>

                    <Goldtrack startDate={user.startDate} endDate={user.endDate} />
                </Container>
            ) : (
                <Container className="flex flex-col p-4 bg-white border border-yellow-100 rounded-lg">
                    <Paragraph className="text-sm text-gray-700 dark:text-gray-300 mb-1 text-center">
                        {user.username}
                    </Paragraph>
                    <Paragraph className="text-sm text-gray-700 dark:text-gray-300 mb-1 text-center">
                        {user.description}
                    </Paragraph>
                </Container>
            )}

            <Container className="flex flex-col items-center gap-6 mt-4 shadow-xl dark:bg-gray-800 dark:text-white p-6 rounded-lg border border-yellow-200">
                <div className="flex justify-between w-full gap-4">
                    <Button
                        onClick={handleDislikeUserClick}
                        className={`flex items-center justify-center w-16 h-16 text-2xl bg-opacity-20 bg-cyan-500 text-gray-500 rounded-full shadow-lg transition-transform transform hover:scale-105 ${selectedButton === 'dislike' ? 'bg-cyan-400 text-red-700' : ''
                            }`}
                    >
                        {selectedButton === 'dislike' ? '❌' : '✖️'}
                    </Button>
                    <Button
                        onClick={handleLikeUserClick}
                        className={`flex items-center justify-center w-16 h-16 text-2xl bg-opacity-20 bg-cyan-500 text-gray-500 rounded-full shadow-lg transition-transform transform hover:scale-105 ${selectedButton === 'like' ? 'bg-cyan-400 text-red-700' : ''
                            }`}
                    >
                        {selectedButton === 'like' ? '❤️' : '🤍'}
                    </Button>
                </div>
            </Container>

            <Time>{formatTime(new Date(user.date))}</Time>
        </article>
    )
}
