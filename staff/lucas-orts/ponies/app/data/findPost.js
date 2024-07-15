import validate from '../validate.js'

function findPost(condition) {
    validate.callback(condition, 'condition')

    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    const post = posts.find(condition)

    return post || null
}

export default findPost