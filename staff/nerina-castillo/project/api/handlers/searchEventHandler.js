import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    let { userId, query: { q, distance, coords } } = req

    distance = Number(distance)

    coords = coords.split(',').map(coord => Number(coord))

    try {
        logic.searchEvent(userId, q, distance, coords)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}