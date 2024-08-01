import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.getUserPosts(username, targetUsername)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}