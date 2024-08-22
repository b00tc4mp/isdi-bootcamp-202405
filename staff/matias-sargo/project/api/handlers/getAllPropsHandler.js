import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllProps(userId)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}