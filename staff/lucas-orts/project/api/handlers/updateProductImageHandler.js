import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { productId } = req.params

    const { image } = req.body

    try {
        logic.updateProductImage(userId, productId, image)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}