import { logic } from 'cor'

export default (req, res, next) => {
    const { productId } = req.params
    try {
        logic.getCartProduct(productId)
            .then(product => res.json(product))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}