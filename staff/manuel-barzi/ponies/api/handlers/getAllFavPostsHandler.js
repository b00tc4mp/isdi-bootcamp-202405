import { logic } from 'cor'

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getAllFavPosts(username, (error, posts) => {
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