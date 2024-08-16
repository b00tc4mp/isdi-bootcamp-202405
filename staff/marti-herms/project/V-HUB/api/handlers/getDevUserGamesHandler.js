import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getDevUserGames(userId)
            .then(games => res.json(games))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}