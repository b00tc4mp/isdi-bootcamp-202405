import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getUserName(userId, targetUserId)
            .then(name => res.json(name))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}