import { logic } from 'core'

export default (req, res, next) => {
    const { userId, query: { q } } = req

    try {
        logic.searchPosts(userId, q)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}