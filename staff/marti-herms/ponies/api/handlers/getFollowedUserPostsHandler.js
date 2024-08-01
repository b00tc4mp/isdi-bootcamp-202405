import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getFollowedUserPosts(username)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}