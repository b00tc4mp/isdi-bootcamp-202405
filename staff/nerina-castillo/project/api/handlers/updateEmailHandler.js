import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { email } = req.body

    try {
        logic.updateEmail(userId, email)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}