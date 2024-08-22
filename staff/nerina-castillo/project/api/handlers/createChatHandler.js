import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userIds } = req.body

    try {
        logic.createChat(userIds)
            .then(chat => res.status(201).json(chat))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}