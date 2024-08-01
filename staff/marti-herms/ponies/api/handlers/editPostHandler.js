import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { newCaption } = req.body

    try {
        logic.editPost(username, postId, newCaption)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}