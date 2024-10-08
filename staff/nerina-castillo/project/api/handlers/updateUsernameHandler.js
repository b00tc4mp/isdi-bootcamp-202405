import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { username } = req.body

    try {
        logic.updateUsername(userId, username)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}