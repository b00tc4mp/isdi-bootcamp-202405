import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { commentId } = req.params

    try {
        logic.deleteComment(userId, commentId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}