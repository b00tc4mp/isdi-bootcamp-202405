import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req.params

    try {
        logic.getUserUsername(userId)
            .then(username => res.json(username))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}