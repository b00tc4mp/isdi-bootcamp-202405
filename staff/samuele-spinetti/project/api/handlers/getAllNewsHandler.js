import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllNews(userId)
            .then(newsArticles => res.json(newsArticles))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}