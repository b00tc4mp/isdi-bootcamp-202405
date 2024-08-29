import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { reviewId } = req.params

    try {
        logic.deleteReview(userId, reviewId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}