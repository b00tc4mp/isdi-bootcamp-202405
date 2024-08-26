import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.getDevUserGames(userId, targetUserId)
            .then(games => res.json(games))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}