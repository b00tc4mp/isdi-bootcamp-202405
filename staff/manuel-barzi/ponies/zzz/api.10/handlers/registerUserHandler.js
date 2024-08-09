import { logic } from 'cor'

export default (req, res, next) => {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
            if (error) {
                next(error)

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        next(error)
    }
}