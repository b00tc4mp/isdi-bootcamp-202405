import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req
    const { chatId } = req.params

    try {
        logic.getMessages(userId, chatId)
            .then(messages => res.json(messages))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}