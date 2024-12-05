import { logic } from "core"

export default (req, res, next) => {
    const { userId } = req

    const { img, caption } = req.body

    try {
        logic.createPost(userId, img, caption)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}