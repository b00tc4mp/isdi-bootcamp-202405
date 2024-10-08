import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.body

    try {
        logic.createChat(userId, targetUserId)
            .then(chatId => res.status(201).json(chatId))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}