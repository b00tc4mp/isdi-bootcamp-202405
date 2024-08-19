import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getUser(userId, targetUserId)
            .then(user => res.json(user))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}