import { logic } from '../../cor/index.js'

export default (req, res) => {
    const { username } = req

    try {
        const posts = logic.getAllPosts(username, (error, posts) => {
            if (error) {
                next(error)

                return
            }

            res.json(posts)
        })
    } catch (error) {
        nexct(error)
    }
}