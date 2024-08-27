import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getUserChats(userId, targetUserId)
            .then(chats => res.json(chats))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}