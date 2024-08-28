import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { q } = req.query

    try {
        logic.searchItems(userId, q)
            .then(results => res.json(results))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}