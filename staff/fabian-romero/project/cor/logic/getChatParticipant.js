import { User, Chat } from '../data/models.js'

import { validate, errors } from 'com'
const { SystemError, NotFoundError, PermissionError } = errors

export default (userId, chatId) => {
    validate.id(userId, 'userId')
    validate.id(chatId, 'chatId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Chat.findById(chatId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(chat => {
                    if (!chat) throw new NotFoundError('chat not found')

                    const index = chat.participants.findIndex(participant => participant._id.toString() === userId)

                    if (index < 0) throw new PermissionError('permission denied')

                    const targetUserId = chat.participants.find(participant => participant._id.toString() !== userId)

                    return User.findById(targetUserId).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(targetUser => {
                            if (!targetUser) throw new NotFoundError('targetUser not found')

                            return chat = {
                                id: chat._id.toString(),
                                date: chat.date,
                                participant: {
                                    id: targetUser._id.toString(),
                                    avatar: targetUser.avatar,
                                    username: targetUser.username
                                }
                            }
                        })
                })
        })
}