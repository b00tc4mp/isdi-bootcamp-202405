import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { caption } = req.body

    try {
        logic.createPost(userId, caption)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
