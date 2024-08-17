import { User, NewsArticle } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, newsId) => {
    validate.id(userId, 'userId')
    validate.id(newsId, 'newsId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return NewsArticle.findById(newsId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(newsArticle => {
                    if (!newsArticle) throw new NotFoundError('newsArticle not found')

                    const { favs } = user

                    const index = favs.findIndex(newsArticleObjectId => newsArticleObjectId.toString() === newsId)

                    if (index < 0)
                        favs.push(newsId)
                    else
                        favs.splice(index, 1)

                    return User.updateOne({ _id: userId }, { $set: { favs } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}