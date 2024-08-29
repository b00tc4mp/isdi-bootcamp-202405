import { User, Chat } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([User.findById(userId).lean(), User.findById(targetUserId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, targetUser]) => {
            if (!user) throw new NotFoundError('user not found')

            if (!targetUser) throw new NotFoundError('targetUser not found')

            return Chat.find({ participants: { $in: targetUserId } }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(chats => {
                    const promises = chats.map(chat => {
                        chat.id = chat._id.toString()
                        delete chat._id

                        chat.participants[0] = chat.participants[0].toString()
                        chat.participants[1] = chat.participants[1].toString()

                        return chat
                    })

                    return Promise.all(promises)
                })
        })
}