import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req
    const { postId } = req.params
    const { text } = req.body

    try {
        logic.createComment(userId, postId, text)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}