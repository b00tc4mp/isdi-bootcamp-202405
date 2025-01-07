import { logic } from 'cor'

export default (req, res, next) => {
    const { userId, query: { q } } = req

    try {
        logic.searchEvent(userId, q)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}