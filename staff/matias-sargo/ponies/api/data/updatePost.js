import fs from 'fs'

function updatePost(condition, post) {

    let json = fs.readFileSync('./data/posts.json', 'utf-8')

    const posts = json ? JSON.parse(json) : []

    const index = posts.findIndex(condition)

    if (index > -1) {
        posts.splice(index, 1, post)

        json = JSON.stringify(posts)

        fs.writeFileSync('./data/posts.json', json)
    }
}

export default updatePost