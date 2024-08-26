import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { newAvatar } = req.body

    try {
        logic.editUserAvatar(userId, newAvatar)
            .then(() => res.status(204).json())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}