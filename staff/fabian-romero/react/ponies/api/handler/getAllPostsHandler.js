import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getAllPosts(username, (error, posts) => {
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