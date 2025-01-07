import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { targetEventId } = req.params

    try {
        logic.toggleGoingEvent(userId, targetEventId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}