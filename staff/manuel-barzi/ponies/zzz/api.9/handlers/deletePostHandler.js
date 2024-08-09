
import { errors } from 'com'
import { logic } from 'cor'

const { NotFoundError, OwnershipError, ValidationError } = errors

export default (req, res) => {
    const { username } = req

    const { postId } = req.params

    try {
        logic.deletePost(username, postId, error => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404
                else if (error instanceof OwnershipError)
                    status = 403

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