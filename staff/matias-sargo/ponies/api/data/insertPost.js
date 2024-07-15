import fs from 'fs'
function insertPost(post) {
    let json = fs.readFileSync('./data/posts.json', 'utf-8')

    const posts = json !== undefined ? JSON.parse(json) : []

    posts.push(post)

    json = JSON.stringify(posts)

    fs.writeFileSync('./data/posts.json', json)
}

export default insertPost