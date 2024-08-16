import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, postId) => {
    validate.string(userId, 'userId')
    validate.string(postId, 'postId')
}