import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getUserProfile(userId)
            .then(userProfile => res.json(userProfile))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}