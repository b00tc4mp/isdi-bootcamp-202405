import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { image, caption } = req.body

    try {
        logic.createPost(userId, image, caption)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}