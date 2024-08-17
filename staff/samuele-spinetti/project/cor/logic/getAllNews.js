import { User, NewsArticle } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return NewsArticle.find({}, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(newsArticles => {
                    return newsArticles.map(newsArticle => {
                        newsArticle.id = newsArticle._id.toString()
                        delete newsArticle._id

                        return newsArticle
                    })
                })
        })
}