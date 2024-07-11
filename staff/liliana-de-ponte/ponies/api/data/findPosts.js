import fs from 'fs'

function findPosts(condition) {
    let json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts = json ? JSON.parse(json) : []

    const foundPosts = posts.filter(condition)

    return foundPosts
}

export default findPosts
