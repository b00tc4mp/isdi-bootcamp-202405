import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { description } = req.body

    try {
        logic.updateDescription(userId, description)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}