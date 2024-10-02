import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { NotFoundError, SystemError } = errors

export default (userId, query) => {
    validate.id(userId, 'userId')
    validate.string(query, 'query')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({
                $or: [
                    { username: new RegExp(query, 'i') },
                    { category: new RegExp(query, 'i') },
                    { roles: new RegExp(query, 'i') }
                ]
            }, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => {
                    const foundUser = users.map(foundUser => {
                        return {
                            id: foundUser._id.toString(),
                            username: foundUser.username,
                            avatar: foundUser.avatar,
                            image: foundUser.image,
                            category: foundUser.category,
                            roles: foundUser.roles,
                        }
                    })

                    return foundUser
                })
        })
}