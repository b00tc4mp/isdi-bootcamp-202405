import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { eventId } = req.params

    const { caption } = req.body

    try {
        logic.updateEventCaption(userId, eventId, caption)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}