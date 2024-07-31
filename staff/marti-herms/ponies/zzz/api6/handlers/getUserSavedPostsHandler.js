import { errors } from "com"
import { logic } from "core"

const { NotFoundError, ValidationError } = errors

export default (req, res) => {
    const { username } = req

    try {
        logic.getUserSavedPosts(username, (error, posts) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        let status = 500

        if (error instanceof ValidationError)
            status = 400

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}