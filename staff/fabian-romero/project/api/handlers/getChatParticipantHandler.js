import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { chatId } = req.params

    try {
        logic.getChatParticipant(userId, chatId)
            .then(chat => res.json(chat))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}