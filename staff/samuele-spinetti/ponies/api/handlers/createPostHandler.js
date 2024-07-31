import { logic } from '../../cor'

export default (req, res, next) => {
    const { username } = req

    const { image, caption } = req.body

    try {
        logic.createPost(username, image, caption, error => {
            if (error) {
                next(error)
            }

            res.status(201).send()
        })
    } catch (error) {
        next(error)
    }
}