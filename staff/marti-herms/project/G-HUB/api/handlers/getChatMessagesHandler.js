import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { chatId } = req.params

    try {
        logic.getChatMessages(userId, chatId)
            .then(messages => res.json(messages))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}