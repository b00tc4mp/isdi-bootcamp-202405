import { User, Chat, Message } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('targetUser not found')

                    return Chat.findOne({ participants: { $all: [userId, targetUserId] } }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(chat => {
                            if (!chat) throw new NotFoundError('chat not found')

                            return Message.find({ chat: chat._id }, { __v: 0 }).sort({ date: 1 }).lean()
                                .catch(error => { throw new SystemError(error.message) })
                                .then(messages => {
                                    const messagePromises = messages.map(message =>
                                        User.findById(message.author).lean()
                                            .catch(error => { throw new SystemError(error.message) })
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
                        })
                })
        })
}