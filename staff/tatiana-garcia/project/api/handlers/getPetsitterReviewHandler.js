import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { petsitterId } = req.params

    try {
        logic.getPetsitterReview(petsitterId)
            .then(reviews => res.json(reviews))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}