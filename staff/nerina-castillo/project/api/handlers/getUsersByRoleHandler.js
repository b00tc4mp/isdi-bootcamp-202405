import { logic } from 'cor'

export default (req, res, next) => {
    const { role } = req.query
    const { userId } = req

    try {
        logic.getUsersByRole(userId, role)
            .then(users => res.json(users))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}