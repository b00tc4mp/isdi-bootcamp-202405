import jwt from 'jsonwebtoken'

import { logic } from 'cor'
import { errors } from 'com'

const { SessionError } = errors

export default (req, res, next) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, process.env.JWT_SECRET, (error, token) => {
                    if (error) {
                        next(new SessionError(error.message))

                        return
                    }

                    res.json(token)
                })
            )
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}