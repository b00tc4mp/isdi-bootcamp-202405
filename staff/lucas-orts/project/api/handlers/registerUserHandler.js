import { logic } from 'cor'

export default (req, res, next) => {
    const { name, surname, email, phone, address, password, passwordRepeat } = req.body
    try {
        logic.registerUser(name, surname, email, phone, address, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}