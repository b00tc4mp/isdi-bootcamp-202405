import { User, Message } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, chatId) => {
    validate.string(userId, 'userId')
    validate.string(chatId, 'chatId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Message.find({ chat: chatId }, { __v: 0 }).sort({ date: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(messages => {
                    const promises = messages.map(message => {
                        return User.findById(message.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                return {
                                    id: message._id.toString(),
                                    text: message.text,
                                    date: message.date,
                                    author: {
                                        id: author._id.toString(),
                                        username: author.username,
                                        avatar: author.avatar
                                    }
                                }
                            })
                    })
                    return Promise.all(promises)
                })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
}