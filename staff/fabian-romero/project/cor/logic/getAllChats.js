import { User, Chat, Message } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Chat.find({ participants: { $in: [userId] } }, { __v: 0, messages: 0, date: 0 }).sort({ date: -1 }).populate('participants', { avatar: 1, username: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(chats => {
                    const promises = chats.map(chat => {
                        chat.id = chat._id.toString()
                        delete chat._id

                        chat.participants.forEach(participant => {
                            if (participant._id.toString() !== userId)
                                chat.participant = {
                                    id: participant._id.toString(),
                                    avatar: participant.avatar,
                                    username: participant.username
                                }
                        })

                        delete chat.participants

                        return Message.find({ chat: chat.id }, { __v: 0 }).sort({ date: 1 }).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(messages => {
                                const lastMessageIndex = messages.length - 1
                                if (lastMessageIndex >= 0) {
                                    const lastMessage = messages[lastMessageIndex]

                                    chat.lastMessage = {
                                        id: lastMessage._id.toString(),
                                        message: lastMessage.message,
                                        date: lastMessage.date,
                                        author: {
                                            id: lastMessage.author._id.toString()
                                        }
                                    }
                                } else {
                                    chat.lastMessage = null
                                }
                                return chat
                            })
                    })

                    return Promise.all(promises)
                        .then(chats => chats)
                })
        })
}