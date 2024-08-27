import { User, Chat } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Chat.find({ participants: { $in: [userId] } }, { __v: 0, messages: 0, date: 0 }).sort({ date: -1 }).populate('participants', { avatar: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(chats => {
                    chats.forEach(chat => {
                        chat.id = chat._id.toString()
                        delete chat._id

                        chat.participants.forEach(participant => {
                            if (participant._id.toString() !== userId)
                                chat.participant = {
                                    id: participant._id.toString(),
                                    avatar: participant.avatar
                                }
                        })

                        delete chat.participants

                        return chat
                    })

                    return chats
                })
        })
}