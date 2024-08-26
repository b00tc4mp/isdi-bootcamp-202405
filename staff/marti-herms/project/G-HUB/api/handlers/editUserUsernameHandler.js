import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { newUsername } = req.body

    try {
        logic.editUserUsername(userId, newUsername)
            .then(() => res.status(204).json())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}