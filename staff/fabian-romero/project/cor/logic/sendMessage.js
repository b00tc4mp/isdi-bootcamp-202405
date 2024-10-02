import { User, Chat, Message } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, chatId, message) => {
    validate.id(userId, 'userId')
    validate.id(chatId, 'chatId')
    validate.string(message, 'message')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Chat.findById(chatId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(chat => {
                    if (!chat) throw new NotFoundError('chat not found')

                    const messageData = {
                        author: userId,
                        message,
                        chat: chatId
                    }

                    return Message.create(messageData)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(message => {
                            return Chat.findByIdAndUpdate(chatId, { $push: { messages: message._id } })
                        })
                        .then(() => { })
                })
        })
}