import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { message } = req.body

    const { chatId } = req.params

    try {
        logic.sendMessage(userId, chatId, message)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}