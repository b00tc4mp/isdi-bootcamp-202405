import data from '../data/index.mjs'

const getAllPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

export default getAllPosts
