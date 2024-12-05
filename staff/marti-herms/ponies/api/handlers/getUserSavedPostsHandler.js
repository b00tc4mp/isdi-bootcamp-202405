import { logic } from "core"

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getUserSavedPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}