import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.toggleFollowUser(username, targetUsername)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}