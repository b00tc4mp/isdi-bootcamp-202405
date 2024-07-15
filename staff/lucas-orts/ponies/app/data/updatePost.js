import validate from '../validate.js'

function updatePost(condition, post) {
    validate.callback(condition, 'condition')
    validate.object(post, 'post')

    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    const index = posts.findIndex(condition)

    if (index > -1) {
        posts.splice(index, 1, post)

        localStorage.posts = JSON.stringify(posts)
    }
}

export default updatePost