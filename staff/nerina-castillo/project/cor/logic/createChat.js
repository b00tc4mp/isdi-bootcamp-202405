import { Chat, User } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userIds) => {
    validate.array(userIds, 'userIds')
    if (userIds.length < 2) throw new ValidationError('invalid userIds')

    return User.find({ _id: { $in: userIds } }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            if (users.length !== userIds.length) throw new NotFoundError('user or users not found')

            const chat = new Chat({ participants: userIds })

            return chat.save()
                .catch(error => { throw new SystemError(error.message) })
        })
}