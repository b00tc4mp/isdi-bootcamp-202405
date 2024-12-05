import jwt from 'jsonwebtoken'

import { logic } from 'core'

import { errors } from 'com'

const { SessionError } = errors

export default (req, res, next) => {
    const { userId } = req

    const { newUsername, password } = req.body

    const { targetUserId } = req.params

    try {
        if (userId !== targetUserId) throw new Error('not authorized')

        logic.editUserUsername(userId, newUsername, password)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}