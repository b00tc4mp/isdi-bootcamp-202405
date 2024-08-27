import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllHCPs(userId)
            .then(healthCareProviders => res.json(healthCareProviders))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}