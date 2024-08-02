import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    const { postId } = req.params

    try {
        logic.deletePost(username, postId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
