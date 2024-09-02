import { logic } from '../../cor/index.js'

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