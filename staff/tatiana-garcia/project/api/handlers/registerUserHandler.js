import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { image, name, surname, email, username, password, passwordRepeat, role, petsitterName, city, description, pets } = req.body

    try {
        logic.registerUser(image, name, surname, email, username, password, passwordRepeat, role, petsitterName, city, description, pets)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}