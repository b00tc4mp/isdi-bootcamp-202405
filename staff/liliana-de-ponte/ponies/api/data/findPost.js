import fs from 'fs'

function findPost(condition) {
    let json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts = json ? JSON.parse(json) : []

    const post = posts.find(condition)

    return post || null
}

export default findPost 