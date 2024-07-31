import { errors } from "com"
import { logic } from "core"

const { NotFoundError, OwnershipError, ValidationError } = errors

export default (req, res) => {
    const { username } = req

    const { newCaption } = req.body

    try {
        logic.editPost(username, postId, newCaption, (error) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                if (error instanceof OwnershipError)
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