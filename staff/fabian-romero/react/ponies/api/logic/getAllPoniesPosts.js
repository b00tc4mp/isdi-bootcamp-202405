import data from '../data/index.js'

const getAllPoniesPosts = username => {


    const user = data.findUser(user => user.username ===
        username)

    if (user === null)
        throw new Error('user not found')

    const posts = data.findPosts(post => user.following.includes(post.author))

    posts.forEach(post => {
        post.fav = user.favs.includes(post.id)
        post.like = post.likes.includes(username)

        const author = data.findUser(user => user.username === post.author)

        post.author = {
            username: author.username,
            avatar: author.avatar,
            following: user.following.includes(author.username)
        }
    })

    return posts.reverse()
}

export default getAllPoniesPosts