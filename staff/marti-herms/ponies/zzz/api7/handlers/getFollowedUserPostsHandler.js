import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getFollowedUserPosts(username, (error, posts) => {
            if (error) {
                next(error)

                return
            }

            res.json(posts)
        })
    } catch (error) {
        next(error)
    }
}