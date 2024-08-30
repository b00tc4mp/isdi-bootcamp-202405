import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(_user => {
            if (!_user) throw new NotFoundError('user not found')

            return Post.find({ user: _user._id }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const userPosts = posts.map(post => {
                        post.id = post._id.toString()

                        delete post._id
                        return post
                    })
                    const userProfile = {
                        id: _user._id.toString(),
                        username: _user.username,
                        avatar: _user.avatar,
                        description: _user.description || '',
                        posts: userPosts
                    }

                    return userProfile
                })
        })
}