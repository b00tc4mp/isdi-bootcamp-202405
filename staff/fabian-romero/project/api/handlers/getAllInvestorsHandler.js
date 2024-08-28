import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllInvestors(userId)
            .then(investors => res.json(investors))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}