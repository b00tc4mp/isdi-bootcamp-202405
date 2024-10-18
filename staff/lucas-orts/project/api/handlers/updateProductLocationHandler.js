import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { productId } = req.params

    const { location } = req.body

    try {
        logic.updateProductLocation(userId, productId, location)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}