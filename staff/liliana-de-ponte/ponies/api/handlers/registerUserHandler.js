import { logic } from '../../cor/index.js'

export default (req, res) => {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    try {
        debugger
        logic.registerUser(name, surname, email, username, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}