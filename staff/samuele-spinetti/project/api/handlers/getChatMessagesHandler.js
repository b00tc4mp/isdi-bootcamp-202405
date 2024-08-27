import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getChatMessages(userId, targetUserId)
            .then(messages => res.json(messages))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}