import { User, Chat } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([User.findById(userId).lean(), User.findById(targetUserId).lean(), Chat.findOne({ participants: { $all: [userId, targetUserId] } }).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser, chat]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!targetUser) throw new NotFoundError('targetUser not found')
            if (chat) return chat._id.toString()

            return Chat.create({ participants: [user._id, targetUser._id] })
                .catch(error => { throw new SystemError(error.message) })
                .then(chat => chat._id.toString())
        })

}