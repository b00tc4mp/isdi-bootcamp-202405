import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { text } = req.body

    const { chatId } = req.params

    try {
        logic.sendMessage(userId, chatId, text)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}