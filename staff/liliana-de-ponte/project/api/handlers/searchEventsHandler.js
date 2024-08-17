import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId, query: { q } } = req

    try {
        logic.searchEvents(userId, q)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}