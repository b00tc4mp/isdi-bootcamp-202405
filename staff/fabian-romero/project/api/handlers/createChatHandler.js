import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.createChat(userId, targetUserId)
            .then(chatId => res.status(201).json(chatId))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}