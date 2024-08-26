import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.openChat(userId, targetUserId)
            .then(chatId => res.json(chatId))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}