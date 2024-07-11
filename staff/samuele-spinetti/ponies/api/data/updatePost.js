import fs from 'fs'

function updatePost(condition, post) {
    let json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts = json ? JSON.parse(json) : []

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1, post)

        json = JSON.stringify(posts)

        fs.writeFileSync('./data/posts.json', json)
    }
}

export default updatePost