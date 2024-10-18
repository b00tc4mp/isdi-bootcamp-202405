import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { phone } = req.body

    try {
        logic.updateUserPhone(userId, phone)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}