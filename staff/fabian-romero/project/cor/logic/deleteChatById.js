import { User, Chat } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, chatId) => {
    validate.id(userId, 'userId')
    validate.id(chatId, 'chatId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Chat.findById(chatId).lean()
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(chat => {
            if (!chat) throw new NotFoundError('chat not found')

            return Chat.deleteOne({ _id: chatId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
