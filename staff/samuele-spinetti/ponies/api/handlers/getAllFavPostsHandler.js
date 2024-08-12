import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    try {
        const posts = logic.getAllFavPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}