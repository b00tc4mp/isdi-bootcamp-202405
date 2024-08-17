import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { newsId } = req.params

    try {
        logic.toggleSaveNews(userId, newsId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}