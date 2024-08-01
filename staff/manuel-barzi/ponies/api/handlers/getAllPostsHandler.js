import { logic } from 'cor'

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getAllPosts(username)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}