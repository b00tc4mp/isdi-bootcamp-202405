import { logic } from 'cor'

export default (req, res, next) => {
    const { role } = req.query

    try {
        logic.getUsersByRole(role)
            .then(users => res.json(users))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}