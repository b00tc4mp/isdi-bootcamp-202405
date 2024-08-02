import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getAllPosts(username)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(Error)
    }
}