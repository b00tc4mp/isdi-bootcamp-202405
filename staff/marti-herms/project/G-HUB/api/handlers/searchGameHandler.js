import { logic } from 'core'

export default (req, res, next) => {
    const { userId, query: { q } } = req

    try {
        logic.searchGame(userId, q)
            .then(games => res.json(games))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}