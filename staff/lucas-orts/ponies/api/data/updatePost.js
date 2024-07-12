import fs from 'fs'
let json = fs.readFileSync('./data/posts.json')

function updatePost(condition, post) {
    const posts = json ? JSON.parse(json) : []

    const index = posts.findIndex(condition)

    if (index > -1) {
        posts.splice(index, 1, post)

        json = JSON.stringify(posts)

        fs.writeFileSync('./data/posts.json', json)
    }
}

export default updatePost