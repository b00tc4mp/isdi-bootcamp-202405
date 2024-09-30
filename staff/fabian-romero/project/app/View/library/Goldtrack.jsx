import React from 'react'
import Paragraph from './Paragraph'

const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    if (now < start) return 0
    if (now > end) return 100

    const totalDuration = end - start
    const elapsedDuration = now - start

    return Math.round((elapsedDuration / totalDuration) * 100)
}

const formatDate = (date) => {
    return date.toLocaleDateString()
}

const Goldtrack = ({ startDate, endDate }) => {
    const progress = calculateProgress(startDate, endDate)

    return (
        <div className="w-full bg-sky-400 rounded-full h-4">
            <div
                className="bg-orange-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
}

const UserProgress = ({ user }) => {
    return (
        <Paragraph className="text-gray-300 mb-1 text-center text-xs">
            {user.startDate && user.endDate
                ? `${formatDate(new Date(user.startDate))} - ${formatDate(new Date(user.endDate))}`
                : 'Fechas no válidas'}

            <Goldtrack startDate={user.startDate} endDate={user.endDate} />
        </Paragraph>
    )
}

export default UserProgress
