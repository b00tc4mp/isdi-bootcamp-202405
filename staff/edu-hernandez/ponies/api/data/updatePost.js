import fs from 'fs'
let json = fs.writeFileSync('./data/posts.json')

function updatePost(condition, post) {
    const posts = json ? JSON.parse(localStorage.posts) : []

    const index = posts.findIndex(condition)

    if (index > -1) {
        posts.splice(index, 1, post)

        json = JSON.stringify(posts)

        fs.writeFileSync('data/posts.json', json)
    }
}

export default updatePost