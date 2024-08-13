import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { image, description, location, startDate, endDate } = req.body

    try {
        logic.createEvent(userId, image, description, location, startDate, endDate)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}