import fs from 'fs'

function findPosts(condition) {
        const json = fs.readFileSync('./data/posts.json', 'utf8')

        const posts = json ? JSON.parse(json) : []

        const post = posts.find(condition)

        return post || null
}

export default findPosts