import { User, Chat, Message } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId).lean()
        })
        .then(targetUser => {
            if (!targetUser) throw new NotFoundError('targetUser not found')

            return Chat.findOne({ participants: { $all: [userId, targetUserId] } }).lean()
        })
        .then(chat => {
            if (!chat) throw new NotFoundError('chat not found')

            return Message.find({ chat: chat._id }, { __v: 0 }).sort({ date: 1 }).lean()
        })
        .then(messages => {
            const messagePromises = messages.map(message =>
                User.findById(message.author).lean()
                    .then(author => {
                        if (!author) throw new NotFoundError('author not found')

                        return {
                            id: message._id.toString(),
                            message: message.message,
                            date: message.date,
                            author: {
                                id: author._id.toString()
                            }
                        }
                    })
            )

            return Promise.all(messagePromises)
        })
        .catch(error => {
            if (error instanceof NotFoundError) throw error
            throw new SystemError(error.message)
        })
}
