import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getUser(userId, targetUserId)
            .then(user => res.send(user))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}