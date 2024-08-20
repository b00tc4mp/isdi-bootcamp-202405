import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getUserFollowing(userId, targetUserId)
            .then(users => res.json(users))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}