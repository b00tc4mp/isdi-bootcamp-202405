import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { productId } = req.params

    const { minprice, maxprice } = req.body

    try {
        logic.updateProductPrice(userId, productId, minprice, maxprice)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}