import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getUserSavedPosts(username, (error, posts) => {
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