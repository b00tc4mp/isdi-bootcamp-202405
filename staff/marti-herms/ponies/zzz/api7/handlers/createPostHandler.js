import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { img, caption } = req.body

    try {
        logic.createPost(username, img, caption, (error) => {
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