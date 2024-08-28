import { User, Post, Comment } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default postId => {
    validate.string(postId, 'postId')

    return Post.findById(postId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            return Comment.find({ post: postId }, { __v: 0 }).sort({ date: 1 }).lean()
                .catch(error => { throw SystemError(error.message) })
                .then(comments => {
                    const promises = comments.map(comment => {
                        return User.findById(comment.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                comment.author = {
                                    id: author._id.toString(),
                                    username: author.username,
                                    avatar: author.avatar
                                }

                                comment.id = comment._id.toString()
                                delete comment._id

                                return comment
                            })
                    })
                    return Promise.all(promises)
                        .then(comments => comments)
                })
        })
}