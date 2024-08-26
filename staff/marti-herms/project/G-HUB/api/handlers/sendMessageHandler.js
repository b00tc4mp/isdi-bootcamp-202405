import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { chatId } = req.params

    const { content } = req.body

    try {
        logic.sendMessage(userId, chatId, content)
    } catch (error) {
        next(error)
    }
}