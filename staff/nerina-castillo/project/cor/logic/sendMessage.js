import { User, Chat, Message } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userId, chatId, text) => {
    validate.string(userId, 'userId')
    validate.string(chatId, 'chatId')
    validate.string(text, 'text')

    if (!text) throw new ValidationError('invalid text')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Chat.findById(chatId).lean()
                .catch(chat => {
                    if (!chat) throw new NotFoundError('chat not found')

                    const message = {
                        author: userId,
                        text: text,
                        chat: chatId,
                    }

                    return Message.create(message)
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}