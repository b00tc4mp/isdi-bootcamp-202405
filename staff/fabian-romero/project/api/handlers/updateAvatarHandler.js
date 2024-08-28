import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req
    const { image } = req.body

    try {
        logic.updateAvatar(userId, image)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}