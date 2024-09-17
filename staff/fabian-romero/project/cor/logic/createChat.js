import { Chat, User } from '../data/models.js'

import { errors, validate } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([User.findById(userId).lean(), User.findById(targetUserId).lean(), Chat.findOne({ participants: { $all: [userId, targetUserId] } }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser, chat]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('targetUser not found')
            if (chat) return chat._id.toString()

            return Chat.create({ participants: [userId, targetUserId] })
                .catch(error => { throw new SystemError(error.message) })
                .then(chat => chat._id.toString())
        })
}