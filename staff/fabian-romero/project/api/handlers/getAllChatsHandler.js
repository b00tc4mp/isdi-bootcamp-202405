import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllChats(userId)
            .then(chats => res.json(chats))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}