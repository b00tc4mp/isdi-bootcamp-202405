import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getUserUsername(userId, targetUserId)
            .then(username => res.json(username))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}