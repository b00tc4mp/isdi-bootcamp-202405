import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { postId } = req.params

    try {
        logic.getAllComments(userId, postId)
            .then(comments => res.json(comments))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}