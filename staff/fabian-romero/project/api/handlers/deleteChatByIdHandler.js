import { logic } from "cor"

export default (req, res, next) => {
    const { userId } = req

    const { chatId } = req.params

    try {
        logic.deleteChatById(userId, chatId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}