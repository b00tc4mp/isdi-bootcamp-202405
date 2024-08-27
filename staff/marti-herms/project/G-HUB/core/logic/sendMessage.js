import { User, Chat, Message } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, chatId, content) => {
    validate.string(userId, 'userId')
    validate.string(chatId, 'chatId')
    validate.string(content, 'content')

    return Promise.all([User.findById(userId).lean(), Chat.findById(chatId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, chat]) => {
            if (!user) throw new NotFoundError('user not found')

            if (!chat) throw new NotFoundError('chat not found')

            return Message.create({
                author: user._id,
                content
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(message =>
            Chat.findByIdAndUpdate(chatId, { date: Date.now(), $push: { messages: message._id } })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}