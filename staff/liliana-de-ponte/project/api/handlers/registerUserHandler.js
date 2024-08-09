import { logic } from '../../cor/index.js'

export default (req, res) => {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)
            .thewn(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}