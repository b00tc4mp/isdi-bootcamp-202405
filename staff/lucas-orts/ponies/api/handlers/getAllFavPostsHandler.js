import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req
    try {
        logic.getAllFavPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}