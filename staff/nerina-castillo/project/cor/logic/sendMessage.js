import { User, Chat, Message } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userId, chatId, text) => {
    validate.string(userId, 'userId')
    validate.string(chatId, 'chatId')
    validate.string(text, 'text')

    if (!text) throw new ValidationError('invalid text')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Chat.findById(chatId).lean()
                .then(chat => {
                    if (!chat) throw new NotFoundError('chat not found')

                    const messageData = {
                        author: userId,
                        text,
                        chat: chatId
                    }

                    return Message.create(messageData)
                        .then(message => {
                            return Chat.findByIdAndUpdate(chatId, { $push: { messages: message._id } })
                                .then(() => message)
                        })
                })
        })
        .catch(error => {
            if (error instanceof NotFoundError) throw error
            throw new SystemError(error.message)
        })
}
