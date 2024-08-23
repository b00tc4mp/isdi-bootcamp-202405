import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { address } = req.body

    try {
        logic.updateUserAddress(userId, address)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}