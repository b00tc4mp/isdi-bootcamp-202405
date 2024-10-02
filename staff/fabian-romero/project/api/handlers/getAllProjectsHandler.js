import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllProjects(userId)
            .then(projects => res.json(projects))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}