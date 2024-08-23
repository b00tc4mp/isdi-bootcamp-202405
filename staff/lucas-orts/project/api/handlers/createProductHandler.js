import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { name, type, minprice, maxprice, image } = req.body

    try {
        logic.createProduct(userId, name, type, minprice, maxprice, image)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}