import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { email, password } = req.body

    try {
        logic.updateEmail(userId, email, password)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}