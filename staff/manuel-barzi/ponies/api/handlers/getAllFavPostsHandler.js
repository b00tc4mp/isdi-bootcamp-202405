import { logic } from 'cor'

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getAllFavPosts(username)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}