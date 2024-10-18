import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { productId } = req.params

    try {
        logic.toggleProductEnable(userId, productId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}