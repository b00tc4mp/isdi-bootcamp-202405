import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    const { postId } = req.params

    try {
        logic.deletePost(username, postId, error => {
            if (error) {
                next(error)

                return
            }

            res.status(204).send()
        })
    } catch (error) {
        next(error)
    }
}