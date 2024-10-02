import { logic } from 'cor'

export default (req, res, next) => {
    const { userId, query: { q } } = req

    try {
        logic.searchUser(userId, q)
            .then(users => res.json(users))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}