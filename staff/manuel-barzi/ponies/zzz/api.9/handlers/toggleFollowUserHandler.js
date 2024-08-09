import { errors } from 'com'
import { logic } from 'cor'

const { NotFoundError, ValidationError } = errors

export default (req, res) => {
    const { username } = req

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
}