import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { postId } = req.params
    try {
        logic.deletePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}