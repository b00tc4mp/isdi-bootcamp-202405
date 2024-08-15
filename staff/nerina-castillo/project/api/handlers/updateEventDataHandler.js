import { logic } from '../../cor/index.js'

export default function updateEventDataHandler(req, res, next) {
    const { userId } = req;
    const { eventId } = req.params
    const eventData = req.body

    try {
        logic.updateEventData(userId, eventId, eventData)
            .then(() => res.status(204).send())
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
}