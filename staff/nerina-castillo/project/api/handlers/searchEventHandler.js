import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    let { userId, query: { q, distance, coords }, date } = req

    distance = Number(distance)

    coords = coords.split(',').map(coord => Number(coord))

    if (date) date = date
    else date = undefined

    try {
        logic.searchEvent(userId, q, distance, coords, date)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}