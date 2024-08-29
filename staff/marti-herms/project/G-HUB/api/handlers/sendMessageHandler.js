import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { chatId } = req.params

    const { content } = req.body

    try {
        logic.sendMessage(userId, chatId, content)
            .then(() => res.status(201).json())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}