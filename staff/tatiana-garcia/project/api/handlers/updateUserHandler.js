import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { newImage, newName, newSurname, newEmail, newSsername, newPassord } = req.body

    try {
        logic.updateUser(userId, newImage, newName, newSurname, newEmail, newSsername, newPassord)
            .then(() => res.status(204).json())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}