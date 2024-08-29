import { User, Chat, Message } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, chatId) => {
    validate.id(userId, 'userId')
    validate.id(chatId, 'chatId')

    return Promise.all([User.findById(userId).lean(), Chat.findById(chatId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, chat]) => {
            if (!user) throw new NotFoundError('user not found')

            if (!chat) throw new NotFoundError('chat not found')

            return Message.find({ _id: { $in: chat.messages } }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(messages => {
                    const promises = messages.map(message => {
                        message.id = message._id
                        delete message._id

                        return User.findById(message.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                message.author = {
                                    id: author._id.toString(),
                                    username: author.username
                                }

                                return message
                            })
                    })

                    return Promise.all(promises)
                })
        })
}