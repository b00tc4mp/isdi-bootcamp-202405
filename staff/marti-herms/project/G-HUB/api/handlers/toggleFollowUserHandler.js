import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.toggleFollowUser(userId, targetUserId)
            .then(() => res.status(204).json())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}