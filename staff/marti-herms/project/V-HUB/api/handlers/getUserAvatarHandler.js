import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getUserAvatar(userId, targetUserId)
            .then(avatar => res.json(avatar))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}