import { User, Game } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, gameId) => {
    validate.string(userId, 'userId')
    validate.string(gameId, 'gameId')
}