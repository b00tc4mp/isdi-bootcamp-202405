import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getNews(userId)
            .then(newsArticles => res.json(newsArticles))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}