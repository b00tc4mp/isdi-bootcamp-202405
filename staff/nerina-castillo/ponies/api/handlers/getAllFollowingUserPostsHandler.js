import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllFollowingUserPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}