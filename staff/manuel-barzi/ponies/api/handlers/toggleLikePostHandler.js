import { logic } from 'cor'

export default (req, res, next) => {
    const { username } = req

    const { postId } = req.params

    try {
        logic.toggleLikePost(username, postId, error => {
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