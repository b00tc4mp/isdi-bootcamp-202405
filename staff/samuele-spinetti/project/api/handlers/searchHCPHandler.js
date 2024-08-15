import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId, query: { q } } = req

    try {
        logic.searchHCP(userId, q)
            .then(healthCareProviders => res.json(healthCareProviders))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}