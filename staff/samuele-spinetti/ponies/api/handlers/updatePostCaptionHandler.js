import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { postId } = req.params

    const { caption } = req.body

    try {
        logic.updatePostCaption(userId, postId, caption)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}