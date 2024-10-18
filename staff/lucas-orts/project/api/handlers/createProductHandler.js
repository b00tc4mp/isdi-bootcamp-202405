import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { name, type, minprice, maxprice, image, location } = req.body

    try {
        logic.createProduct(userId, name, type, minprice, maxprice, image, location)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}