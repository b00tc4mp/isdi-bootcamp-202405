import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({ _id: { $in: user.match } }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(usersFavs => {
                    if (!usersFavs || usersFavs.length === 0)
                        return []

                    const favUsers = usersFavs.map(user => {
                        user.id = user._id.toString()
                        delete user._id

                        return user
                    })

                    return Promise.all(favUsers)
                })
        })
}

//ESTA LOGICA LA QUIERO USAR PARA MATCH, QUE PUEDA VER MIS MATCH DENTRO DE LA APP EN VEZ DE UNA LISTA DE FAVORITOS