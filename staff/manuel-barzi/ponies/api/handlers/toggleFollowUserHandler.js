import jwt from 'jsonwebtoken'

import { errors } from 'com'
import { logic } from 'cor'

const { NotFoundError, ValidationError } = errors

export default (req, res) => {
    const { authorization } = req.headers

    const token = authorization.slice(7)

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            res.status(498).json({ error: SessionError.name, message: error.message })

            return
        }

        const { sub: username } = payload

        const { targetUsername } = req.params

        try {
            logic.toggleFollowUser(username, targetUsername, error => {
                if (error) {
                    let status = 500

                    if (error instanceof NotFoundError)
                        status = 404

                    res.status(status).json({ error: error.constructor.name, message: error.message })

                    return
                }

                res.status(204).send()
            })
        } catch (error) {
            let status = 500

            if (error instanceof ValidationError)
                status = 400

            res.status(status).json({ error: error.constructor.name, message: error.message })
        }
    })
}