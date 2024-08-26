import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllUserProducts(userId)
            .then(products => res.json(products))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}